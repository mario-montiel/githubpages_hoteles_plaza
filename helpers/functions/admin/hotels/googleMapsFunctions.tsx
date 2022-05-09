// React
import { useEffect, useState } from "react";

// Libraries
import { toast } from 'react-toastify';
import { apiKey } from "../../../../config/googleMaps/apiKey"

// CSS
import 'react-toastify/dist/ReactToastify.css';
// import styles from "../../../../../pages/aG90ZWxlc19wbGF6YQ0K/pruebon.module.css"
import styles from "../../../../styles/admin/system/hotels/HotelsAux.module.css"

// Components

// Helpers

// Types
import { PlaceOfInterestElement, Ubication } from "../../../../types/Hotel";

const googleMaps = () => {

    // Variables
    let map: google.maps.Map;
    let customMap: google.maps.Map;
    const mapOptions = {
        center: {
            lat: 25.5428443 /* 25.5692562 */,
            lng: -103.4067861/* -103.5008397 */
        },
        zoom: 16
    };

    // States
    const [showGoogleMaps, setShowGoogleMaps] = useState<boolean>(false)
    const [showReferences, setShowReferences] = useState<boolean>(false)
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState<boolean>(false)
    const [latLngEditHotel, setLatLngEditHotel] = useState<Ubication>()
    const [dataOfPlace, setDataOfPlace] = useState<any>()
    const [dataOfCustomPlace, setDataOfCustomPlace] = useState<any>()
    const [placesOfInterestList, setPlacesOfInterestList] = useState<Array<PlaceOfInterestElement>>([])

    // Use Effect
    useEffect(() => {
        if (showGoogleMaps) {
            initGoogleMaps()
        }

        if (showReferences) {
            initCustomGoogleMaps()
        }
    }, [dataOfPlace, dataOfCustomPlace, showGoogleMaps, showReferences])

    // Functions
    const initGoogleMaps = () => {
        let newUbication: Ubication = checkTheValueOfLatLng()

        apiKey.load().then(() => {
            const div = document.getElementById('map') as HTMLElement

            map = new google.maps.Map(div!, newUbication);
            
            loadInputHTMLInMap('map', map)
            showNearbySearch(newUbication)
        }).catch((err: any) => { console.log(err); });
    }

    const checkTheValueOfLatLng = () => {
        if (!latLngEditHotel) {
            return {
                center: {
                    lat: dataOfPlace ? dataOfPlace[0].geometry.location.lat() : mapOptions.center.lat,
                    lng: dataOfPlace ? dataOfPlace[0].geometry.location.lng() : mapOptions.center.lng
                },
                zoom: 16
            }
        } else {
            return {
                center: {
                    lat: latLngEditHotel.center.lat,
                    lng: latLngEditHotel.center.lng
                },
                zoom: 16
            }
        }
    }

    const sendLatLngEditHotel = (latitude: any, longitude: any) => {
        setLatLngEditHotel({
            center: {
                lat: latitude,
                lng: longitude
            },
            zoom: 16
        })
    }

    const fillDataOfPlacesOfInterest = (places: Array<PlaceOfInterestElement>) => {
        console.log('fillDataOfPlacesOfInterest');
        setPlacesOfInterestList(places)
    }

    const activeCustomMap = () => {
        setShowReferences(!showReferences)
    }

    const initCustomGoogleMaps = () => {
        const div = document.getElementById('custom_map') as HTMLElement
        const mapOptions = {
            center: {
                lat: 25.5428443 /* 25.5692562 */,
                lng: -103.4067861/* -103.5008397 */
            },
            zoom: 16
        };

        apiKey.load().then(() => {
            const newUbication = {
                center: {
                    lat: dataOfCustomPlace ? dataOfCustomPlace[0].geometry.location.lat() : mapOptions.center.lat,
                    lng: dataOfCustomPlace ? dataOfCustomPlace[0].geometry.location.lng() : mapOptions.center.lng
                },
                zoom: 16
            }

            customMap = new google.maps.Map(div!, newUbication);

            if (customMap && dataOfCustomPlace) {
                new google.maps.Marker({
                    position: newUbication.center,
                    map: customMap,
                });
            }

            getMyGeolocation()
            loadInputHTMLInMap('custom_map', customMap)
        }).catch((err: any) => { console.log(err); });
    }

    const loadInputHTMLInMap = async (type: string, map: google.maps.Map<Element>) => {
        const input = await document.createElement('input') as HTMLInputElement;
        const button = await document.createElement('button') as HTMLInputElement;
        const searchBox = new google.maps.places.SearchBox(input);

        input.classList.add(styles.input_google_maps_css)
        button.classList.add(styles.pruebon_css)
        button.textContent = 'Buscar';
        button.placeholder = "x"
        button.type = 'button';

        getDataOfUrlGoogleMaps(map, input, searchBox, type)
    }

    const getDataOfUrlGoogleMaps = async (map: google.maps.Map<Element>, input: HTMLElement, searchBox: google.maps.places.SearchBox, type: string) => {
        if (type === 'map') {
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
            });

        } else {
            customMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            customMap.addListener("bounds_changed", () => {
                searchBox.setBounds(customMap.getBounds() as google.maps.LatLngBounds);
            });
        }

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            const bounds = new google.maps.LatLngBounds();
            
            if (places.length == 0) { return; }

            if (type === 'map') {
                setDataOfPlace(places)
                map.fitBounds(bounds);
            } else {
                const origin = { lat: dataOfPlace ? dataOfPlace[0].geometry.location.lat() : map.getCenter().lat(), lng: dataOfPlace ? dataOfPlace[0].geometry.location.lng() : map.getCenter().lng() };
                const myLatLng = { lat: places[0].geometry!.location.lat(), lng: places[0].geometry!.location.lng() }

                setDataOfCustomPlace(places)
                detectDistanceBetweenTwoPoints(places[0].name, origin, myLatLng)

                customMap.fitBounds(bounds)
            }

            setGoogleMapsLoaded(true)
        });
    }

    const getMyGeolocation = () => {
        let infoWindow: google.maps.InfoWindow;
        infoWindow = new google.maps.InfoWindow();

        if (navigator.geolocation && !dataOfCustomPlace) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(customMap);
                    customMap.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, customMap.getCenter());
                }
            );
        }

        if (!navigator.geolocation) {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, customMap.getCenter());
        }
    }

    const handleLocationError = (
        browserHasGeolocation: boolean,
        infoWindow: google.maps.InfoWindow,
        pos: google.maps.LatLng
    ) => {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(customMap);
    }

    const showNearPlaces = (ubication: Ubication) => {
        apiKey.load().then(() => {
            let service = new google.maps.places.PlacesService(map);
            let request: any = {
                location: ubication.center,
                radius: 500,
                placeTypes: [
                    'restaurant', 'park', 'movie_theater',
                    'bank', 'bar', 'book_store', 'cafe',
                    'department_store', 'drugstore', 'hospital',
                    'tourist_attraction', 'shopping_mall'
                ]
            };
            const placesList = document.getElementById("places") as HTMLUListElement;

            if (placesList && placesList.children.length > 0) {
                removeAllPlacesOfUbicationSelected()
            }

            service.nearbySearch(request, callback);

            function callback(results: any, status: any) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    addPlaces(results, map, ubication);
                    addCheckedIfPlaceExist()

                    map.setCenter(ubication.center);
                }
            }

            console.log('se cargó edit');
            setGoogleMapsLoaded(true)
        });

    }

    const showNearbySearch = (ubication: Ubication) => {
        let service = new google.maps.places.PlacesService(map);
        let request: any = {
            location: ubication.center,
            radius: 500,
            placeTypes: [
                'restaurant', 'park', 'movie_theater',
                'bank', 'bar', 'book_store', 'cafe',
                'department_store', 'drugstore', 'hospital',
                'tourist_attraction', 'shopping_mall'
            ]
        }

        // Perform a nearby search.
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);

        function callback(results: any, status: any) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                if (dataOfPlace) {
                    addPlaces(results, map, ubication);
                }

            }
        }
    }

    const addPlaces = (
        places: google.maps.places.PlaceResult[],
        map: google.maps.Map,
        ubication?: Ubication
    ) => {

        const placesList = document.getElementById("places") as HTMLElement;

        for (const place of places) {
            if (place.geometry && place.geometry.location) {
                const divContainer = document.createElement('div') as HTMLDivElement
                const li = document.createElement("li");
                const input = document.createElement("input");
                const image = {
                    url: place.icon!,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };

                new google.maps.Marker({
                    map,
                    icon: image,
                    title: place.name!,
                    position: place.geometry.location,
                });

                divContainer.classList.add(styles.google_maps_sites_container)
                input.type = 'checkbox'
                input.value = place.name
                input.disabled = true
                input.classList.add(styles.google_map_checkbox)
                li.textContent = place.name!;
                divContainer.append(li, input)
                placesList.appendChild(divContainer);
                divContainer.addEventListener("click", (elHtml: any) => {
                    let origin = { lat: dataOfPlace ? dataOfPlace[0].geometry?.location.lat() : ubication?.center.lat, lng: dataOfPlace ? dataOfPlace[0].geometry?.location.lng() : ubication?.center.lng };
                    let destination = { lat: place.geometry!.location.lat(), lng: place.geometry!.location.lng() };
                    
                    map.setCenter(place.geometry!.location!);
                    
                    detectDistanceBetweenTwoPoints(place.name, origin, destination)
                    addInputAttribute(elHtml.target.localName == 'div' ? elHtml.target!.children[1] : elHtml.target!.parentElement.children[1])
                });
            }
        }
    }

    const addCheckedIfPlaceExist = () => {
        const placesList = document.getElementById("places") as HTMLUListElement;

        placesOfInterestList.forEach(place => {
            for (let index = 0; index < placesList.children.length; index++) {
                if (place.name === placesList.children[index].textContent?.trim()) {
                    const input = placesList.children[index].children[1]
                    input.setAttribute('checked', 'true')
                }
            }
        });
    }

    const detectDistanceBetweenTwoPoints = (name: string, origin: object, destination: object) => {
        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING
            }, callback);

        async function callback(response: any) {
            const data = {
                name,
                distance: response ? response.rows[0].elements[0].distance.text : 0,
                duration: response ? response.rows[0].elements[0].duration.text : 0,
                travelMode: 'Vehicle'
            }

            checkIfThePlaceIsRepeated(data)
        }
    }

    const checkIfThePlaceIsRepeated = (data: PlaceOfInterestElement) => {

        const referencesTable = document.querySelector('.table')

        if (referencesTable!.children.length > 1) {
            for (let index = 0; index < referencesTable!.children[1].children.length; index++) {
                const element: any = referencesTable!.children[1].children[index];

                if (data.name.trim() === element.children[0].innerText.trim()) {
                    toast('Ya tiene seleccionado esta referencia', {
                        position: "top-left",
                        autoClose: 2000,
                        type: 'warning'
                    })
                    addStylesInElementOfTable(element)
                    return referencesTable!.scrollIntoView({ block: 'start', behavior: 'smooth' });
                }
            }
        }

        setPlacesOfInterestList(oldValue => [...oldValue, data])
        toast('Lugar seleccionado', {
            position: "top-right",
            autoClose: 2000,
            type: 'success'
        })
    }

    const addStylesInElementOfTable = (htmlElement: HTMLElement) => {
        htmlElement.classList.add(styles.addAnimiation)
        setTimeout(() => {
            htmlElement.classList.remove(styles.addAnimiation)
        }, 3000);
    }

    const addInputAttribute = (inputHTML: any) => {
        if (!inputHTML.checked) {
            inputHTML.setAttribute('checked', 'true')
        }
    }

    const removeElList = (data: any) => {
        const placesList = document.getElementById("places") as HTMLUListElement;

        for (let index = 0; index < placesList.children.length; index++) {
            const input = placesList.children[index].children[1]

            if (data.name === placesList.children[index].children[0].textContent?.trim()) {
                input.removeAttribute('checked')
            }
        }
        setPlacesOfInterestList(placesOfInterestList.filter((item: PlaceOfInterestElement) => item.name !== data.name));
    }

    const removeAllPlacesOfUbicationSelected = () => {
        const placesList = document.getElementById("places") as HTMLElement;

        if (placesList && placesList.children.length > 0) {
            for (let index = 0; index < placesList.children.length; index++) {
                const placeElement = placesList.children[index];

                placesList.removeChild(placeElement)
            }
        }
    }

    return {
        dataOfPlace,
        showGoogleMaps,
        showReferences,
        googleMapsLoaded,
        placesOfInterestList,
        activeCustomMap,
        setShowGoogleMaps,
        setShowReferences,
        sendLatLngEditHotel,
        initGoogleMaps,
        fillDataOfPlacesOfInterest,
        showNearPlaces,
        removeElList,
        removeAllPlacesOfUbicationSelected
    }
}

export default googleMaps