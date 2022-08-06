import React, { useState, useEffect } from 'react';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { getAllMovieList } from '../service/Movie.service';
import { InputText } from 'primereact/inputtext';

const RecommendationMovie = () => {


    let [movies, setMovies] = useState([])
    const [MovieList, setMovieList] = useState([])
    const [searchInput, setSearchInput] = useState([])

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



    const dataviewHeader = (
        <div className="grid grid-nogutter mb-3 mt-3">

            <div className="col-12 mb-3 mt-3 text-center">
                <h1>
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

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full my-3">
                    <img src={`${data.image}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                    <div className="flex-1 text-center md:text-left">
                        <div className="font-bold text-2xl">{data.name}</div>
                        <div className="mb-3">{data.description}</div>
                        <Rating value={data.rating} readonly cancel={false} className="mb-2"></Rating>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 lg:col-2 md:col-3 sm:col-6">
                <div className="mt-3 ml-3 mr-3 border-1 surface-border" style={{ boxShadow: 'none!important' }}>
                    <div className="text-center">
                        <img src={`${data.poster}`} alt={data.title} className="shadow-2 mb-3 mx-0" style={{ height: '460px', width: '100%' }} />
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

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="grid list-demo">
            <div className="col-12">
                <div className="card">
                    <h5>DataView</h5>
                    <DataView value={movies} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                </div>
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(RecommendationMovie, comparisonFn);