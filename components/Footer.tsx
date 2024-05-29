import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <div id="footer">
        <div className="container-fluid py-4" id="footer-links">
            <div className="row px-5 justify-content-center">
                <div className="col-md-3 links">
                    <p className="fs-18 fw-800">Información</p>
                    <a href={`mailto:Infomx@uma-health.com`} className="branch-email">
                        <p className="fs-18">Info@uma-health.com</p>
                    </a>
                    <Link href="https://umasalud.com.mx/terminos-y-condiciones" target="_blank">
                        <p className="fs-18">Términos y condiciones</p>
                    </Link>
                    <Link href="https://umasalud.com.mx/politica-de-privacidad" target="_blank">
                        <p className="fs-18">Política de privacidad</p>
                    </Link>
                    <Link href="https://umasalud.com/" target="_blank">
                        <p className="fs-18">ÜMA Argentina</p>
                    </Link>
                </div>
                <div className="col-md-3 links">
                    <p className="fs-18 fw-800">Servicios</p>
                    <Link href="https://umasalud.com.mx/campaign/guard/onboarding" target="_blank">
                        <p className="fs-18">Médicos 24 hs.</p>
                    </Link>
                    <Link href="https://pacientes.umasalud.com.mx/login?redirect=%2Fmarketplace" target="_blank">
                        <p className="fs-18">Mi especialista online</p>
                    </Link>
                    <Link href="https://umasalud.com.mx/productos/autonomous" target="_blank">
                        <p className="fs-18">Diagnóstico asistido</p>
                    </Link>
                </div>
                <div className="col-md-3 links">
                    <p className="fs-18 fw-800">Recursos</p>
                    <Link href="http://umasalud.com/trabaja-con-nosotros" target="_blank">
                        <p className="fs-18">Trabaja con nosotros</p>
                    </Link>
                    <Link href="https://umasalud.com.mx/preguntas-frecuentes" target="_blank">
                        <p className="fs-18">Preguntas frecuentes</p>
                    </Link>
                    <Link href="https://umasalud.com/blog" target="_blank">
                        <p className="fs-18">Blog</p>
                    </Link>
                    <Link href="https://umasalud.com/partners" target="_blank">
                        <p className="fs-18">Confían en nosotros</p>
                    </Link>
                    <a href={`mailto:jruiz@uma-health.com`} className="branch-email">
                        <p className="fs-18">Solicitar Demo</p>
                    </a>
                </div>
                <div className="col-md-3 links">
                    <p className="fs-18 fw-800">Inteligencia Artificial</p>
                    <Link href="https://pacientes.umasalud.com.mx/cardiovascular" target="_blank">
                        <p className="fs-18">Test de Riesgo Cardiovascular</p>
                    </Link>
                    <Link href="https://pacientes.umasalud.com.mx/autonomous" target="_blank">
                        <p className="fs-18">Diagnóstico asistido</p>
                    </Link>
                    <Link href="https://pacientes.umasalud.com.mx/pillbox" target="_blank">
                        <p className="fs-18">Mis medicinas</p>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <hr />
                    <p className="m-0">© 2024 | Lucía Ll.</p>
                </div>
            </div>
        </div>
        {/*<div className="fixed-callcenter">
      <a href="tel:+56552844635">
        <img src="/images/callcenter2.png" />
      </a>
  </div>*/}
    </div>
);

export default Footer;
