import React, { useState, useEffect, useContext } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { getAllMovieList } from '../service/Movie.service';
import { InputText } from 'primereact/inputtext';
import { useHistory } from 'react-router-dom';
import { LoadingContaxt } from '../shared/context/common.context';

const PopularMovie = () => {


    let [movies, setMovies] = useState([])
    let [moviesRec, setMoviesRec] = useState([])
    const [MovieList, setMovieList] = useState([])
    const [MovieListRec, setMovieListRec] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchInputRec, setSearchInputRec] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {

        setLoading(true);
        const getAllMovies = async () => {
            const movie = await getAllMovieList();

            setMovies(movie);
            setMovieList(movie)
            setMovieListRec(movie)
            setMoviesRec(movie);

            setTimeout(() => {
                setLoading(false)
              }, 1000)
        }
        getAllMovies()
    }, []);

    const [layout, setLayout] = useState('grid');
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);

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

                        console.log(searchInput);

                        if (searchInput.length > 2) {

                            movies = MovieList.filter(function(item){
                                return item.title.toLowerCase().includes(searchInput.toLowerCase()) 
                            });
                            setMovies(movies)
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
                    value={searchInputRec}
                    style={{ borderRadius: '25px' }}
                    onChange={event => {
                        setSearchInputRec(event.target.value);

                        if (searchInput.length > 2) {
    
                             movies = MovieList.filter(function(item){
                                return item.title.toLowerCase().includes(searchInputRec.toLowerCase()) 
                            });
                            setMoviesRec(movies)
                        }
                        else {

                            setMoviesRec(MovieList)
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
                    state: data

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
                    state: data
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


    return (
        <div className="grid list-demo" style={{ marginRight: '0px' }}>
                <div className="col-12">
                    <div className="card">
                        <h5>DataView</h5>
                        <DataView value={movies} layout={layout} paginator rows={100} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                        <DataView value={moviesRec} layout={layout} paginator rows={100} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplateRec} header={dataviewHeaderRec}></DataView>
                    </div>

                </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {

    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(PopularMovie, comparisonFn);