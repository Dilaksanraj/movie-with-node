import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';
import { Rating } from 'primereact/rating';
import { CustomerService } from '../service/CustomerService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { createMovie, getAllMovieList } from '../service/Movie.service';
import { InputTextarea } from 'primereact/inputtextarea';

const MovieListAdmin = () => {
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');
    




    useEffect(() => {
        setLoading1(true);
        const getAllMovies = async () => {
            const movie = await getAllMovieList();

            console.log(movie);
            setCustomers1(movie);
        }
        getAllMovies();

        setLoading1(false);

    }, []);



    const titleBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{rowData.title}</span>
            </React.Fragment>
        );
    }

    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{rowData.releaseDate}</span>
            </React.Fragment>
        );
    }

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.title} src={`${rowData.poster}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
            </React.Fragment>
        );
    }


    const basicDialogFooter = <><Button type="button" label="Save" onClick={handleSubmit} icon="pi pi-plus" className="p-button-primary" /> <Button type="button" label="close" onClick={() => setDisplayBasic(false)} icon="pi pi-minus" className="p-button-danger" /></>;


    async function handleSubmit(event) {

        event.preventDefault();

        const data = {
            title: title,
            poster: poster,
            release_date: `${new Date(date).getDate()}-${new Date(date).getMonth()}-${new Date(date).getFullYear()}`,
            link: link,
            desc:desc
        };

        console.log(data);

        const res = await createMovie(data);

        console.log(res);

        if (res.data) {
            setCustomers1(res.data);
            setDisplayBasic(false);

        } else {
            console.log('error');
        }
        setDate('');
        setTitle('');
        setPoster('');
        setDesc('');
        setLink('');
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
        <div className="grid table-demo">

            <Dialog header="New Movie" visible={displayBasic} style={{ width: '30vw' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                <div>
                    <label htmlFor="title" className="block text-900 font-medium mb-2">Title</label>
                    <InputText id="first_name" type="text" className="w-full mb-3"
                        onChange={event => {
                            setTitle(event.target.value)
                        }}
                        value={title} />

                    <label htmlFor="poster" className="block text-900 font-medium mb-2">Poster Image</label>
                    <InputText id="poster" type="text" className="w-full mb-3"
                        onChange={event => {
                            setPoster(event.target.value)
                        }}
                        value={poster} />

                    <label htmlFor="link" className="block text-900 font-medium mb-2">Video source</label>
                    <InputText id="link" type="text" className="w-full mb-3"
                        onChange={event => {
                            setLink(event.target.value)
                        }}
                        value={link} />
                    <label htmlFor="desc" className="block text-900 font-medium mb-2">Description</label>
                    <InputTextarea placeholder="Your description" autoResize rows="3" cols="30" className="w-full mb-3" 
                    onChange={event => {
                        setDesc(event.target.value)
                    }}
                    value={desc} 
                    />

                    <label htmlFor="release data" className="block text-900 font-medium mb-2">Release date</label>
                    <Calendar style={{ width: '100%' }} inputId="calendar"
                        onChange={event => {
                            setDate(event.target.value)
                        }} className="p-invalid" showIcon
                        value={date} />
                </div>
            </Dialog>

            <div className="flex-1 text-center mb-3 md:text-right col-6">
                <div className="font-bold text-2xl">
                    <Button label="Create New" className="mr-2 mb-2" onClick={() => setDisplayBasic(true)} ></Button>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="flex-1 text-center mb-3">
                        <div className="font-bold text-2xl">Manage Movie</div>
                    </div>
                    <DataTable value={customers1} paginator className="p-datatable-gridlines" showGridlines rows={100}
                        dataKey="id"  loading={loading1} responsiveLayout="scroll"
                        emptyMessage= {emptyMessage}>
                        <Column field="name" header="Title" style={{ minWidth: '12rem' }} body={titleBodyTemplate} />
                        <Column header="Poster" style={{ minWidth: '12rem' }} body={representativeBodyTemplate}
                            filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column header="Release date" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={dateBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MovieListAdmin, comparisonFn);
