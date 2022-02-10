const convertTolatLng = (latLng, name) => {
    return {
        latLng,
        name
    };
};

export const locations = {
    CCM: convertTolatLng("44.473389263658824,-73.20608314784715", "CCM"),
    Perry: convertTolatLng("44.47394816197259,-73.2041640018212", "Perry")
};