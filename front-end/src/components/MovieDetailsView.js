import React from 'react';
import { Button } from 'primereact/button';
import BlockViewer from '../BlockViewer';
import { useHistory } from 'react-router-dom';

const MovieDetailsView = () => {

    const history = useHistory()

    const block1 = `
<div className="grid grid-nogutter surface-section text-800">
    <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
        <section>
            <span className="block text-6xl font-bold mb-1">Create the screens your</span>
            <div className="text-6xl text-primary font-bold mb-3">your visitors deserve to see</div>
            <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

            <Button label="Learn More" type="button" className="mr-3 p-button-raised"></Button>
            <Button label="Live Demo" type="button" className="p-button-outlined"></Button>
        </section>
    </div>
    <div className="col-12 md:col-6 overflow-hidden">
        <img src="images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
    </div>
</div>
    `;

    return (
        <>
            <div className="grid" style={{ marginRight: '0px' }}>

                {history.location.state.link &&
                    <div className='col-12'>

                        <iframe width="100%"
                            height="720"
                            src={history.location.state.link}
                            title="VIKRAM - Official Trailer | Kamal Haasan | VijaySethupathi, FahadhFaasil | LokeshKanagaraj | Anirudh"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen ></iframe>
                    </div>
                }

                {!history.location.state.link &&
                    <div className='col-12'>

                        <iframe width="100%" height="720" src="https://www.youtube.com/embed/fb5ELWi-ekk" title="Jurassic World Dominion - Official Trailer [HD]" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                }

                <div className="col-12">
                    <BlockViewer header="Hero" code={block1}>
                        <div className="grid grid-nogutter surface-section text-800">
                            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                                <section>
                                    <div className="text-6xl text-primary font-bold mb-3">{history.location.state.title}</div>
                                    <p>{history.location.state.desc}</p>
                                    <Button label="Learn More" type="button" className="mr-3 p-button-raised"></Button>
                                    <Button label="Watch video" type="button" className="p-button-outlined"></Button>
                                </section>
                            </div>
                            <div className="col-12 md:col-6 overflow-hidden">
                                <img src={history.location.state.poster} alt="hero-1" className="block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)', height: '400px', width: '50%', float: 'right' }} />
                            </div>
                        </div>
                    </BlockViewer>
                </div>



            </div></>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MovieDetailsView, comparisonFn);

