const convertTolatLng = (lat, lng, name) => {
    return {
        lat,
        lng,
        name
    };
};

export const locations = {
    CCM: convertTolatLng("44.473198780008346","-73.20450179833591", "CCM"),
    Perry: convertTolatLng("44.47327567286289","-73.20589387668263", "Perry Hall"),
    Ireland: convertTolatLng("44.47363088076816", "-73.20363212110158", "Ireland"),
    Joyce: convertTolatLng("44.4730875404341", "-73.2039991337361", "Joyce"),
    Freeman: convertTolatLng("44.47322148193624", "-73.20372235006406", "Freeman"),
    IDX: convertTolatLng("44.472758360860034", "-73.20416138623351", "IDX"),
    Foster: convertTolatLng("44.473285047287305", "-73.20322604830729", "Foster"),
    MIC: convertTolatLng("44.4733363525373", "-73.20295572000768", "MIC"),
    Aiken: convertTolatLng("44.47355542040299", "-73.20286404628459", "Aiken"),
    West: convertTolatLng("44.473462690438225", "-73.20617350681603", "West Hall"),
};