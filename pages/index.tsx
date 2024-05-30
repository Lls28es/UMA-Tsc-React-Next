import React, { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ModalText from '../components/ModalText';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { es } from 'date-fns/locale';
import { RiCloseCircleLine } from 'react-icons/ri';

interface MonthData {
  month: number;
  name: string;
  endDate: string;
  urlApi: string;
  dataApi: NasaApiResponse[];
}

interface NasaApiResponse {
  id: string;
  date: string;
  url: string;
  thumbnail_url: string;
  yearStr: string;
}

let modifiers: Record<string, Date> = {};
let modifiersStyles: Record<string, React.CSSProperties> = {};

const Home: React.FC = () => {
  const [actualDate, setActualDate] = useState<Date>(new Date());
  const [yearStr, setYearStr] = useState<string>("");
  const [months, setMonths] = useState<MonthData[]>([]);
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [actualData, setActualData] = useState<NasaApiResponse | null>(null);
  const [stateModal, setStateModal] = useState<boolean>(false);

  useEffect(() => {

    setYearStr(moment().format('YYYY'));
    let aux: MonthData[] = [];
    let actualDay = moment().format('YYYY-MM-DD');
    let actualMonth = moment().format('MM');
    let allUrls: Promise<any>[] = []; // Array que primero tendrá las promesas y luego reunirá los links de las imágenes.

    for (let i = 1; i < 13; i++) {
      let daysMonth = new Date(`${moment().format('YYYY')},${i}`), // Obtenemos el último día de cada mes.
        y = daysMonth.getFullYear(),
        m = daysMonth.getMonth() + 1; // Sumamos un día al mes porque se está contando desde cero y necesitamos que cuente desde uno para crear el string con la fecha de cada día del mes.
      let startDay = moment(new Date(y, m - 1, 1)).format('DD'); // Restamos un día porque la librería moment también cuenta desde cero los meses.
      let startDate = `${y}-${m}-${startDay}`; // Creamos el string del primer ...
      let endDay = moment(new Date(y, m, 0)).format('DD');
      let endDate = `${y}-${m}-${endDay}`; // y último día del mes para usarlo como intervalo en la ruta de la api de la NASA.
      let urlApiMonth = '';

      if (i <= Number(actualMonth)) { // Solo pediremos datos a la API de los meses transcurridos ya que no hay imagenes de los que no han transcurrido.
        urlApiMonth = `https://api.nasa.gov/planetary/apod?api_key=P14kKudfh6DmRLij0f5l6skIXJmzFnr5DuvwHp1R&start_date=${startDate}&end_date=${i == Number(actualMonth) ? actualDay : endDate}&thumbs=true`; // actualDay se usa para el mes actual, ya que si pedimos un intervalo con una fecha que aúno no ha sucedido tenemos como respuesta un error.
        allUrls.push(axios.get(urlApiMonth)); // Juntamos las promesas.
      } else {
        urlApiMonth = '';
      }

      aux.push({  // Reunimos los datos de cada mes, nombre, día en que finaliza, la ruta que nos dará los datos de la API para ese mes, etc.
        month: i,
        name: moment(String(i), 'MM').format('MMMM'),
        endDate: endDate,
        urlApi: urlApiMonth,
        dataApi: [],
      });
    }

    Promise.all(allUrls)  // Hacemos las llamadas a la API usando "Promise.all" para obtener todas las respuestas en el mismo momento.
      .then((results) => {
        results.forEach((x, ind) => { // Recorremos el array de objeto que nos ha dado la API para cada mes y vamos modificándola a necesidad y guardando la información.
          aux[ind].dataApi = x.data;
          if (x.data.length !== 0) {
            x.data.forEach((day: NasaApiResponse) => { // Aquí recorremos los datos para cada día del mes.
              if (day.url.includes('tube')) { // Si la propiedad url contiene el link de un video usamos la propiedad que tiene una captura del video.
                day.url = day.thumbnail_url || '';
              }
              if (day.url.includes(' ')) { // Si la el link tiene un espacio provoca que la imagen no se vea en el cuadro del día correspondiente, solucionamos el problema.
                day.url = day.url.replace(' ', '%20');
              }

              const numbersDate = day.date.split('-').map(Number);  // Vamos a crear un id para cada día, sirve para dar estilos a Day-picker, mostrar la imagen en el cuadro de cada día, para buscar la información de cada día y mostrarla, y para guardar y buscar comentarios sobre ese día en la base de datos.
              day.id = `d${day.date}`;

              modifiers[day.id] = new Date(numbersDate[0], numbersDate[1] - 1, numbersDate[2]); // Aquí armamos los estilos para cada día con la imagen corresondiente al día.
              modifiersStyles[day.id] = {
                background: `url(${day.url})`,
                backgroundSize: 'cover',
                borderRadius: '3px',
                textShadow: '1.2px 1.2px 0px #020202',
                color: '#ffffff',
                opacity: 1,
              };
            });
          }
        });
        setMonths(aux);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const getDay = (value: Date) => { // Función que nos permite buscar y mostrar en el modal la información del día clickeado, muestra el modal.
    let numberMonth = Number(moment(value).format('MM'));
    let stringDay = moment(value).format('YYYY-MM-DD');

    if (months.length !== 0) {
      let foundMonth = months.filter((month) => month.month === numberMonth);

      if (foundMonth.length !== 0 && foundMonth[0].dataApi.length !== 0) {
        let foundDay = foundMonth[0].dataApi.filter(
          (day: NasaApiResponse) => day.date === stringDay
        );

        if (foundDay.length !== 0) {

          setActualData(foundDay[0]);
          setStateModal(true);
        }
      }
    }
  };

  const backModal = () => { // Oculta el modal.
    setStateModal(false)
    setActualData(null);
  }

  return (
    <div className="container-fluid px-0 disp_cont">
      <div className="row w-100 mx-0" id="wrapper">
        <Layout>
          <Head>
            <title>Calendario UMA</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
            />
          </Head>
          <div
            id="calendar"
            className="row align-items-center justify-content-center px-3 py-5"
          >
            {months.length ? <>{
              months.map((x, ind) => {
                return (
                  <DayPicker
                    key={ind}  // Obligatorio para que react diferencie entre componentes/items y sus modificaciones.
                    mode="single" // Sirve para seleccionar un día, Day-picker tiene una función que permite seleccionar intervalos.
                    selected={selected} // Permite diferenciar el día seleccionado.
                    onSelect={(value) => setSelected(value)} // Guarda el día seleccionado.
                    locale={es} // Permite ver los nombres de los meses y días con su nombre en español
                    onDayClick={(date) => getDay(date as Date)} // Activa la función antes explicada,
                    disabled={{  // Desactiva los días posteriores al actual, estos no tienen imagen.
                      after: actualDate!,
                      before: new Date('12,30,2124'),
                    }}
                    className="form-control date-picker"
                    month={new Date(Number(yearStr), x.month - 1)} // Permite usar los estilos creados para cada día mostrando así la imagen de cada día en el cuadro correspondiente.
                    modifiers={modifiers} // Objeto con las fechas que se estilizarán.
                    modifiersStyles={modifiersStyles} // Estilos para cada fecha
                  />
                );
              })}</> : null}
          </div>
        </Layout>
      </div>
      {/* Estilos que se superponen cuando se abre el modal y quedan por detrás del modal, permite cerrar este. */}
      {actualData ? <div id="home-modal" className={stateModal ? 'modalOn' : 'modalOff'}>
        <div
          id="home-modal-overlay"
          className="home-modal-overlay pointer"
          onClick={() => backModal()}
        ></div>
        <div
          id="home-modal-container"
          className="home-popup-container text-break"
        >
          <button
            className="close-modal button-modal"
            onClick={() => backModal()}
          >
            <RiCloseCircleLine
              color="#5487cf"
              fontSize="34px"
              strokeWidth="0.5"
            />
          </button>
          {/*  Modal que muestra la información de la NASA para ese día y nos permite comentar. */}
          {actualData !== null ? <ModalText data={actualData} /> : null}
        </div>
      </div> : null}
    </div>
  );
}

export default Home;