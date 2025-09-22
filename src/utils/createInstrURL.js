export default function createInstrURL(data){
    let instrURL = new URL(window.location.origin+"/instructorResult/");
    instrURL.searchParams.append("instructor",data);
    return instrURL;
}