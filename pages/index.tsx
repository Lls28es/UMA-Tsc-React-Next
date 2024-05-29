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
  dataApi: any[];
}

interface NasaApiResponse {
  date: string;
  url: string;
  thumbnail_url: string;
  yearStr: string;
}

function Home() {
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
    let allUrls: Promise<any>[] = [];

    for (let i = 1; i < 13; i++) {
      let daysMonth = new Date(`${moment().format('YYYY')},${i}`),
        y = daysMonth.getFullYear(),
        m = daysMonth.getMonth() + 1;
      let startDay = moment(new Date(y, m - 1, 1)).format('DD');
      let startDate = `${y}-${m}-${startDay}`;
      let endDay = moment(new Date(y, m, 0)).format('DD');
      let endDate = `${y}-${m}-${endDay}`;
      let urlApiMonth = '';

      if (i <= Number(actualMonth)) {
        urlApiMonth = `https://api.nasa.gov/planetary/apod?api_key=P14kKudfh6DmRLij0f5l6skIXJmzFnr5DuvwHp1R&start_date=${startDate}&end_date=${i == Number(actualMonth) ? actualDay : endDate}&thumbs=true`;
        allUrls.push(axios.get(urlApiMonth));
      } else {
        urlApiMonth = '';
      }

      aux.push({
        month: i,
        name: moment(String(i), 'MM').format('MMMM'),
        endDate: endDate,
        urlApi: urlApiMonth,
        dataApi: [],
      });
    }

    Promise.all(allUrls)
      .then((results) => {
        results.forEach((x, ind) => {
          aux[ind].dataApi = x.data;
        });
        setMonths(aux);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  const getDay = (value: Date) => {
    let numberMonth = Number(moment(value).format('MM'));
    let stringDay = moment(value).format('YYYY-MM-DD');

    if (months.length !== 0) {
      let foundMonth = months.filter((month) => month.month === numberMonth);

      if (foundMonth.length !== 0 && foundMonth[0].dataApi.length !== 0) {
        let foundDay = foundMonth[0].dataApi.filter(
          (day: NasaApiResponse) => day.date === stringDay
        );

        if (foundDay.length !== 0) {
          if (foundDay[0].url.includes('tube')) {
            foundDay[0].url = foundDay[0].thumbnail_url || '';
          }
          setActualData(foundDay[0]);
          setStateModal(true);
        }
      }
    }
  };

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
                    key={ind}
                    // dateFormat="YYYY-MM-DD"
                    mode="single"
                    selected={selected}
                    onSelect={(value) => setSelected(value)}
                    locale={es}
                    onDayClick={(date) => getDay(date as Date)}
                    month={new Date(Number(yearStr), x.month - 1)}
                    disabled={{
                      after: actualDate!,
                      before: new Date('12,30,2124'),
                    }}
                    className="form-control"
                  />
                );
              })}</> : null}
          </div>
        </Layout>
      </div>
      <div id="home-modal" className={stateModal ? '' : 'd-none'}>
        <div
          id="home-modal-overlay"
          className="home-modal-overlay pointer"
          onClick={() => setStateModal(false)}
        ></div>
        <div
          id="home-modal-container"
          className="home-popup-container text-break"
        >
          <button
            className="close-modal button-modal"
            onClick={() => setStateModal(false)}
          >
            <RiCloseCircleLine
              color="#5487cf"
              fontSize="34px"
              strokeWidth="0.5"
            />
          </button>
          <ModalText data={actualData!} />
        </div>
      </div>
    </div>
  );
}

export default Home;