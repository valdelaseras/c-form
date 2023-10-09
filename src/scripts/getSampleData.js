export function getSampleData(){
    return fetch('/scripts/data/sample-data.json')
        .then( response => response.json() )
        .then( jsonData => jsonData.map( jsonElement => jsonElement ))
        .catch((error) => {
            console.log(error)
        });
}
