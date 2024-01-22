import "./destination-show.scss";
import { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, getDestinationById } from "store";
import { useThunk } from "hooks/useThunk";
import mainImage from "../../assets/main-section-image.jpg";
import destImg1 from "../../assets/background2.jpg";
import destImg2 from "../../assets/background4.jpg";
import destImg3 from "../../assets/background5.jpg";
import Button from "components/Button";
import ContentCard from "components/ContentCard";
import DestinationCard from "components/DestinationCard";
import Map from "components/Map";
import Footer from "components/Footer";
import Gallery from "components/Gallery";

const DestinationShow = () => {
    const { id } = useParams();
    const mapRef = useRef<HTMLDivElement>(null);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const destination = useAppSelector(state => state.destinations.allDestinations.find(d => d.destination.id == id));
    //const { data, error, isLoading } = useGetDestinationQuery(2);
    const [getDestById, isDestLoading, destError] = useThunk(getDestinationById);

    useEffect(() => {
        getDestById(id);
    }, [id]);

    if (isDestLoading || !destination) {
        return <div>Loading...</div>;
    }
    console.log(destination)

    const scrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    const { title, sub_title, description, categories, location, image } = destination.destination;
    const { weather } = destination;
    const temperature = (weather.main.temp - 273.15).toFixed(1);
    const windSpeed = (weather.wind.speed * 1.60934).toFixed(1);

    const renderedCategories = categories.map((c: string) => (
        <div key={c} className="content-card-category">
            <span>{c}</span>
        </div>
    ));

    const renderedSuggestedDests = destination.similar_destinations.map((dest: any) =>
        <Fragment key={dest.id}>
            <DestinationCard
                className="dest-suggested-card"
                id={dest.id}
                image={destImg3}
                title={dest.title}
                subTitle={dest.sub_title}
                categories={dest.categories} />
        </Fragment>
    );

    return (
        <main className="dest-show">
            {isGalleryOpen && <Gallery isGalleryOpen={true} setIsGalleryOpen={setIsGalleryOpen} />}
            <div className="dest-show-container">
                <header className="dest-heading">
                    <p className="dest-sub-heading">{sub_title}</p>
                    <h1 className="dest-main-heading">{title}</h1>

                    <Button
                        variant="primary" icon="route" iconAriaHidden={true}
                        onClick={scrollToMap}>Take me there</Button>
                </header>
                <section className="dest-image-section">
                    <div className="dest-main-image">
                        <img src={mainImage} alt="Image showing destination" />
                        <Button
                            onClick={() => setIsGalleryOpen(true)}
                            variant="gallery-button" icon="photo_library" iconAriaLabel="Open gallery"></Button>
                    </div>
                </section>
                <section className="dest-main-section">
                    <div className="dest-main-section-wrapper">
                        <section className="dest-main-section-right-side">
                            <div className="dest-quick-info">
                                <ContentCard
                                    icon="location_on"
                                    iconAriaHidden
                                    heading="Location Coordinates">
                                    {location.latitude},
                                    <br />
                                    {location.longitude}
                                </ContentCard>
                                <ContentCard
                                    icon="category"
                                    iconAriaHidden
                                    heading="Categories">
                                    {renderedCategories}
                                </ContentCard>
                                <ContentCard icon="thermostat" iconAriaHidden
                                    heading="Weather Today" className="dest-weather">
                                    <div>
                                        <h4>Temperature</h4>
                                        <p>{temperature}<span>°C</span></p>
                                    </div>
                                    <div>
                                        <h4>Wind</h4>
                                        <p>{windSpeed}<span>km/h</span></p>
                                    </div>
                                    <div>
                                        <h4>Humidity</h4>
                                        <p>{weather.main.humidity}<span>%</span></p>
                                    </div>
                                </ContentCard>
                            </div>
                            <ContentCard className="dest-bus-schedules" icon="directions_bus" iconAriaHidden heading="Bus schedules for today">
                                /
                            </ContentCard>
                        </section>

                        <section className="dest-main-section-left-side">
                            <ContentCard className="dest-description" icon="menu_book" iconAriaHidden heading="Description">
                                {description}
                            </ContentCard>
                            <div ref={mapRef} className="dest-map-container">
                                <Map latitude={location.latitude} longitude={location.longitude} />
                                {/* <a href="#" target="_blank">Link to Google Maps</a> */}
                                {/* Link above is for users who cannot interact with map */}
                            </div>
                        </section>

                        <section className="dest-main-section-suggested">
                            <h2 className="dest-suggested-heading">Similar places</h2>
                            <section className="dest-suggested-cards">
                                {renderedSuggestedDests}
                            </section>
                        </section>
                    </div>
                </section>
                <Footer className="dest-footer" />
            </div>
        </main>
    );
};

export default DestinationShow;