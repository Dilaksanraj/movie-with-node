import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import { Galleria } from 'primereact/galleria';
import { Button } from 'primereact/button';
import { Image } from "primereact/image";
import { PhotoService } from '../service/PhotoService';
import "./home-carousel.scss";

const HomeCarousel = () => {
    const [images, setImages] = useState([]);
    const galleriaResponsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 5,
            maxHeight: "600px"
        },
        {
            breakpoint: "960px",
            numVisible: 4,
            maxHeight: "600px"
        },
        {
            breakpoint: "768px",
            numVisible: 3,
            maxHeight: "600px"
        },
        {
            breakpoint: "560px",
            numVisible: 1,
            maxHeight: "600px"
        },
    ];
    const carouselResponsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: "768px",
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: "560px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    useEffect(() => {
        const photoService = new PhotoService();
        photoService.getImages().then((images) => setImages(images));
    }, []);

    const carouselItemTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="mb-3">
                        <img src={`assets/demo/images/product/${product.image}`} alt={product.name} className="product-image" />
                    </div>
                    <div>
                        <h4 className="p-mb-1">
                            {product.name}
                        </h4>
                        <h6 className="mt-0 mb-3">${product.price}</h6>
                        <span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>
                        <div className="car-buttons mt-5">
                            <Button type="button" className="p-button p-button-rounded mr-2" icon="pi pi-search"></Button>
                            <Button type="button" className="p-button-success p-button-rounded mr-2" icon="pi pi-star"></Button>
                            <Button type="button" className="p-button-help p-button-rounded" icon="pi pi-cog"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const galleriaItemTemplate = (item) => <img src={`assets/${item.itemImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block',maxHeight:'600px'}} />
    const galleriaThumbnailTemplate = (item) => <img src={`assets/${item.thumbnailImageSrc}`} alt={item.alt} style={{ width: '100%', display: 'block',maxHeight:'600px' }} />

    return (
        <div className="grid p-fluid media-demo">
            <div className="col-12">
                <Galleria value={images} responsiveOptions={galleriaResponsiveOptions} numVisible={7}
                    item={galleriaItemTemplate} thumbnail={galleriaThumbnailTemplate} circular autoPlay transitionInterval={2000}></Galleria>

            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(HomeCarousel, comparisonFn);