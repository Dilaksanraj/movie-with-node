import React, { useState, useEffect, useContext } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { PickList } from 'primereact/picklist';
import { OrderList } from 'primereact/orderlist';
import { getAllMovieList } from '../service/Movie.service';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { LoadingContaxt } from '../shared/context/common.context';

const MyMovie = () => {

    console.log(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

    return (
        <div>
            <h1>
                Welcome to my movie
            </h1>
        </div>
    )

}

const comparisonFn = function (prevProps, nextProps) {

    return prevProps.location.pathname === nextProps.location.pathname;
};

export default MyMovie;