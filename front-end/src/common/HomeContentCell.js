import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import BlockViewer from '../BlockViewer';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppsConst } from '../shared/AppsConst';

const HomeContentCell = (props) => {

    const [checked, setChecked] = useState(false);

    return (

        <>
            <div className="col-12 md:col-12 mb-4 overflow-hidden">
                <span className="p-3 shadow-2 mb-3 inline-block surface-card overflow-hidden" style={{ borderRadius: '10px' }}>
                    {props.data.type == AppsConst.mediaType.Video &&
                        <video lassName="md:ml-auto block md:h-full" data-uia="our-story-card-video" autoplay="" playsinline="" muted="" loop="" source src={props.data.url} type="video/mp4"></video>
                    }

                    {props.data.type == AppsConst.mediaType.img &&
                        <img lassName="md:ml-auto block md:h-full" autoplay="" playsinline="" muted="" loop="" source src={props.data.url} type="video/mp4"></img>
                    }


                </span>
                <div className="text-900 mb-3 font-medium">{props.data.title}</div>
                <span className="text-700 text-sm line-height-3">{props.data.para}</span>
            </div>
        </>
    )

}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(HomeContentCell, comparisonFn);