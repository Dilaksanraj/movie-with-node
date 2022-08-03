import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { PickList } from 'primereact/picklist';
import { OrderList } from 'primereact/orderlist';
import { ProductService } from '../service/ProductService';
import { getAllMovieList } from '../service/Movie.service';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';

const PopularMovie = () => {


    let [movies, setMovies] = useState([])
    const [MovieList, setMovieList] = useState([])
    const [searchInput, setSearchInput] = useState([])
    const history = useHistory()

    useEffect(() => {

        const getAllMovies = async () => {
            const movie = await getAllMovieList();
            setMovies(movie);
            setMovieList(movie)
        }
        getAllMovies()
    }, []);


    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);


    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then(data => setDataviewValue(data));
    }, []);

    const dataviewHeader = (
        <div className="grid grid-nogutter mb-3 mt-3">

            <div className="col-12 mb-3 text-center" style={{ marginTop: '48px' }}>
                <h1 style={{ fontFamily: 'serif' }}>
                    Popular Movie
                </h1>

            </div>

            <div className="col-3 mb-3 mt-3 text-right">
                <h3>
                    Search :
                </h3>

            </div>

            <div className="col-6 mb-3 mt-3 text-left">
                <InputText id="first_name" type="text" className="w-full mb-3"
                    value={searchInput}
                    style={{ borderRadius: '25px' }}
                    onChange={event => {
                        setSearchInput(event.target.value);

                        if (searchInput.length > 2) {

                            movies = MovieList.filter(e => { return e.title.includes(searchInput) });
                            setMovies(movies)

                            console.log(movies);
                        }
                        else {

                            setMovies(MovieList)
                        }

                    }}
                />

            </div>

        </div>
    );


    const dataviewHeaderRec = (
        <div className="grid grid-nogutter mb-3 mt-3">

            <div className="col-12 mb-3 text-center" style={{ marginTop: '48px' }}>
                <h1 style={{ fontFamily: 'serif' }}>
                    Recommended Movie
                </h1>

            </div>

            <div className="col-3 mb-3 mt-3 text-right">
                <h3>
                    Search :
                </h3>

            </div>

            <div className="col-6 mb-3 mt-3 text-left">
                <InputText id="first_name" type="text" className="w-full mb-3"
                    value={searchInput}
                    style={{ borderRadius: '25px' }}
                    onChange={event => {
                        setSearchInput(event.target.value);

                        if (searchInput.length > 2) {

                            movies = MovieList.filter(e => { return e.title.includes(searchInput) });
                            setMovies(movies)

                            console.log(movies);
                        }
                        else {

                            setMovies(MovieList)
                        }

                    }}
                />

            </div>

        </div>
    );


    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 lg:col-2 md:col-3 sm:col-6" style={{ cursor: 'pointer' }} onClick={event => {
                history.push({
                    pathname: `/movie/${data._id}`,
                    state:data
                    
                })
                // history.push('/movie')

            }}>
                <div className="mt-3 ml-3 mr-3 border-1 surface-border" style={{ boxShadow: 'none!important' }}>
                    <div className="text-center">
                        <img src={`${data.poster}`} alt={data.title} className="shadow-2 mb-3 mx-0" style={{ height: '360px', width: '100%' }} />
                        <div className="text-2xl font-bold">{data.title}</div>
                        <div className="mb-3">{data.releaseDate}</div>
                        <Rating value={4} readonly cancel={false} className='mb-3' />
                    </div>
                    <div className="flex align-items-center justify-content-between">


                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItemRecommendation = (data) => {
        return (
            <div className="col-12 lg:col-2 md:col-3 sm:col-6" style={{ cursor: 'pointer' }} onClick={event => {
                history.push({
                    pathname: `/movie/${data._id}`,
                    state:data
                })
            }}>
                <div className="mt-3 ml-3 mr-3 border-1 surface-border" style={{ boxShadow: 'none!important' }}>
                    <div className="text-center">
                        <img src={`${data.poster}`} alt={data.title} className="shadow-2 mb-3 mx-0" style={{ height: '360px', width: '100%' }} />
                        <div className="text-2xl font-bold">{data.title}</div>
                        <div className="mb-3">{data.releaseDate}</div>
                        <Rating value={4} readonly cancel={false} className='mb-3' />
                    </div>
                    <div className="flex align-items-center justify-content-between">


                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }
        return dataviewGridItem(data);
    };

    const itemTemplateRec = (data, layout) => {
        if (!data) {
            return;
        }

        return dataviewGridItemRecommendation(data);
    };

    const  emptyMessage = () => {
        return (
            
                <div>
                    <h1>
                        No data found
                    </h1>
                </div>
            
        );
    }

    return (
        <div className="grid list-demo" style={{ marginRight: '0px' }}>
            <div className="col-12">
                <div className="card">
                    <h5>DataView</h5>
                    <DataView value={movies} layout={layout} paginator rows={100} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader} emptyMessage= {emptyMessage}></DataView>
                    <DataView value={movies} layout={layout} paginator rows={100} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplateRec} header={dataviewHeaderRec}></DataView>
                </div>

            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {

    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(PopularMovie, comparisonFn);