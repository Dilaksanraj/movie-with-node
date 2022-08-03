import React from 'react';
import HomeCarousel from './HomeCarousel';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import BlockViewer from '../BlockViewer';
import HomeContentCell from './HomeContentCell';
import { AppsConst } from '../shared/AppsConst';

const Home = () => {

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

    const block2 = `
    <div className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
        <div className="mb-3 font-bold text-2xl">
            <span className="text-900">One Product, </span>
            <span className="text-blue-600">Many Solutions</span>
        </div>
        <div className="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
        <div className="grid">
            <div className="col-12 md:col-4 mb-4 px-5">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-desktop text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Built for Developers</div>
                <span className="text-700 text-sm line-height-3">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span>
            </div>
            <div className="col-12 md:col-4 mb-4 px-5">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-lock text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">End-to-End Encryption</div>
                <span className="text-700 text-sm line-height-3">Risus nec feugiat in fermentum posuere urna nec. Posuere sollicitudin aliquam ultrices sagittis.</span>
            </div>
            <div className="col-12 md:col-4 mb-4 px-5">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Easy to Use</div>
                <span className="text-700 text-sm line-height-3">Ornare suspendisse sed nisi lacus sed viverra tellus. Neque volutpat ac tincidunt vitae semper.</span>
            </div>
            <div className="col-12 md:col-4 mb-4 px-5">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-globe text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Fast & Global Support</div>
                <span className="text-700 text-sm line-height-3">Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.</span>
            </div>
            <div className="col-12 md:col-4 mb-4 px-5">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-github text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Open Source</div>
                <span className="text-700 text-sm line-height-3">Nec tincidunt praesent semper feugiat. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. </span>
            </div>
            <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card" style={{ borderRadius: '10px' }}>
                    <i className="pi pi-shield text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 mb-3 font-medium">Trusted Securitty</div>
                <span className="text-700 text-sm line-height-3">Mattis rhoncus urna neque viverra justo nec ultrices. Id cursus metus aliquam eleifend.</span>
            </div>
        </div>
    </div>
        `;


    const content = [
        {
            title: "Watch everywhere",
            para: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.",
            url: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v",
            type: AppsConst.mediaType.Video
        },
        {
            title: "Create profiles for kids",
            para: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
            url: 'https://occ-0-1168-769.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png?r=11f',
            type: AppsConst.mediaType.img
        },

        {
            title: "Download your shows to watch offline.",
            para: "Save your favorites easily and always have something to watch.",
            url: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg",
            type: AppsConst.mediaType.img
        },
        {
            title: "Enjoy on your TV.",
            para: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
            url: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
            type: AppsConst.mediaType.Video
        },

    ];
    return (
        <>
            {/* <HomeCarousel></HomeCarousel> */}
            <div className="grid">

                <div className="col-12">
                    <BlockViewer header="Hero" code={block1}>
                        <div className="grid grid-nogutter surface-section text-800">
                            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                                <section>
                                    <span className="block text-6xl font-bold mb-1">Enjoy on your TV.</span>
                                    <div className="text-6xl text-primary font-bold mb-3">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</div>
                                    {/* <p className="mt-0 mb-4 text-700 line-height-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}

                                    <Button label="Learn More" type="button" className="mr-3 p-button-raised"></Button>
                                    <Button label="Watch video" type="button" className="p-button-outlined"></Button>
                                </section>
                            </div>
                            <div className="col-12 md:col-6 overflow-hidden">
                                <img src="images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                            </div>
                        </div>
                    </BlockViewer>
                </div>

                <div className="col-12">
                    <BlockViewer header="Feature" code={block2}>
                        <div className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
                            <div className="mb-3 font-bold text-2xl">
                                <span className="text-900">One Product, </span>
                                <span className="text-blue-600">Many Solutions</span>
                            </div>
                            <div className="text-700 text-sm mb-6">Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna.</div>
                            <div className="grid">

                                {content.map((e) =>
                                    // Correct! Key should be specified inside the array.
                                    <HomeContentCell data={e}></HomeContentCell>
                                )}
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

export default React.memo(Home, comparisonFn);
