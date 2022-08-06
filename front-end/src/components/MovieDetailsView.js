import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import BlockViewer from '../BlockViewer';
import { useHistory, useParams } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import { createComments, deleteComments, getAllComments, getAllMovieComments } from '../service/Comments.service';
import { AppsConst } from '../shared/AppsConst';
import { getAllMovieList } from '../service/Movie.service';
import { Rating } from 'primereact/rating';

const MovieDetailsView = () => {

    // get movie id from params
    const { id } = useParams();
    const [currentMovieId, setCurrentMovieId] = useState(id);

    const history = useHistory()
    const [comments, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [movie, setCurrentMovie] = useState([]);
    const [ratingValue, setRatingValue] = useState(null);

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

    useEffect(() => {
        const getAllComments = async () => {

            const comments = await getAllMovieComments(currentMovieId);

            // filter comment for current movie
            const filterComment = comments.filter(function (item) {
                return item.movie_id == currentMovieId
            });
            setAllComments(filterComment);
        }

        // getMovie
        const getAllMovie = async () => {

            const comments = await getAllMovieList();

            // filter comment for current movie
            const currentMovie = comments.find(function (item) {
                return item._id == currentMovieId
            });

            setCurrentMovie(currentMovie);

            console.log('current movie', currentMovie);
        }

        getAllMovie();
        getAllComments()
    }, []);

    async function submit(event) {

        event.preventDefault();

        const data = {
            text: comments,
            user_id: localStorage.getItem(AppsConst.authId),
            movie_id: movie._id,
        };
        const res = await createComments(data);


        if (res.data) {

            const filterComment = res.data.filter(function (item) {
                return item.movie_id == currentMovieId
            });

            setAllComments(filterComment);

        } else {
            console.log('error');
        }

        setComment('');
    };

    async function deleteComment( data) {

        const res = await deleteComments(data);

        console.log(res);

        if (res) {

            const filterComment = res.filter(function (item) {
                return item.movie_id == currentMovieId
            });

            setAllComments(filterComment);

        } else {

            console.log('error');
        }

        setComment('');
    };

    return (
        <>
            <div className="grid" style={{ marginRight: '0px' }}>

                {movie.link &&
                    <div className='col-12'>
                        <iframe width="100%"
                            height="720"
                            src={movie.link ? movie.link : ''}
                            title="VIKRAM - Official Trailer | Kamal Haasan | VijaySethupathi, FahadhFaasil | LokeshKanagaraj | Anirudh"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen ></iframe>
                    </div>
                }

                {!movie.link &&
                    <div className='col-12'>

                        <iframe width="100%" height="720" src="https://www.youtube.com/embed/fb5ELWi-ekk" title="Jurassic World Dominion - Official Trailer [HD]" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                }

                <div className="col-12">
                    <BlockViewer header="Hero" code={block1}>
                        <div className="grid grid-nogutter surface-section text-800">
                            <div className="col-12 md:col-8 p-6 text-center md:text-left flex align-items-center ">
                                <section>
                                    <div className="text-6xl text-primary font-bold mb-3">{movie.title}</div>
                                    <p style={{ fontSize: '12px' }}>{movie.desc}</p>
                                    <Button label="Learn More" type="button" className="mr-3 p-button-raised"></Button>
                                    <Button label="Watch video" type="button" className="p-button-outlined"></Button>

                                    <div style={{ margin: '12px', display: 'flex' }}>
                                        <Rating value={ratingValue} onChange={(e) => setRatingValue(e.value)} />
                                        <a style={{ marginLeft: '12px', cursor: 'pointer' }}>update</a>
                                    </div>
                                </section>



                            </div>
                            <div className="col-12 md:col-4 overflow-hidden">
                                <img src={movie.poster} alt="hero-1" className="block" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)', height: '400px', width: '70%', float: 'right' }} />
                            </div>
                        </div>
                    </BlockViewer>
                </div>

                <div className='col-12'>
                    <div className="col-6">
                        {allComments.map(element =>
                            <div key={element._id} style={{ borderWidth: '3px', borderColor: 'darkgray', padding: '24px', borderRadius: '20px', fontSize: '18px', margin: '24px', background: '#ffffff' }}>
                                <img src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' style={{ width: '30px', height: '30px', float: 'left' }} />

                                <p style={{ paddingLeft: '48px', fontSize: '14px' }}>
                                    <a>{element.user_id.first_name}</a>
                                </p>

                                <p style={{ paddingLeft: '48px', marginBottom: '0px' }}>
                                    {element.comment}
                                </p>
                                <div style={{ marginLeft: '42px' }}>
                                    <span style={{ fontSize: '12px', margin: '6px' }}>{`${new Date(element.created_at).getDate()}-${new Date(element.created_at).getMonth()}-${new Date(element.created_at).getFullYear()}`}</span>
                                    <span style={{ fontSize: '16px', margin: '6px' }}><a>like</a></span>
                                    <span style={{ fontSize: '16px', margin: '6px' }}><a>replay</a></span>
                                    <span style={{ fontSize: '16px', margin: '6px', color: 'red', cursor:'pointer' }}><a style={{ color: 'red' }} 
                                    onClick={() => {

                                        deleteComment(element._id)
                                        
                                    }}>
                                        {element.user_id._id == localStorage.getItem(AppsConst.authId) ? 'delete' : ''}
                                    </a></span>
                                </div>
                            </div>


                        )}
                    </div>

                </div>

                <div className='col-12'>
                    <div className="col-6" style={{ marginLeft: '24px' }}>

                        <InputTextarea placeholder="Your comment" autoResize rows="3" cols="30" className="w-full mb-3" style={{ height: '70px', fontSize: '18px' }}
                            onChange={event => {
                                setComment(event.target.value)
                            }}
                            value={comments}
                        />
                    </div>

                    <div className="flex-1 text-center mb-3 md:text-right col-6">
                        <div className="font-bold text-2xl">
                            <Button label="Submit" className="mr-2 mb-2" onClick={submit} ></Button>
                        </div>
                    </div>
                </div>



            </div></>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MovieDetailsView, comparisonFn);

