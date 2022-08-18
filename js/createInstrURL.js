export default function createInstrURL(data){
    let instrURL = new URL(window.location.href+"instructorResult/");
    instrURL.searchParams.append("instructor",data.instructor);
    return instrURL;
}