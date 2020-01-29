if(checkPage('sourse')) {
    let sourseFilterForm = document.querySelector('.sourseFilterForm');
    let sourseFilterType = document.querySelectorAll('.sourseFilterType')
    let sourseFilterParametrs = document.querySelectorAll('.sourseFilterParametrs')

    let getByTabHeader = id =>{

        let tabheaderData= sourseFilterForm.querySelector(".sourseFilterType[data-header='"+id+"']");
        
        sourseFilterType.forEach(sourseFilterType => {
            sourseFilterType.classList.remove('active');
            let tabHeader = sourseFilterType.getAttribute('data-header');
            if(tabHeader == id && !tabheaderData.classList.contains('active')){
                tabheaderData.classList.add('active');
            }
        })
        let tabBody= sourseFilterForm.querySelector(".sourseFilterParametrs[data-body='"+id+"']");
        sourseFilterParametrs.forEach(sourseFilterParametrs => {
            sourseFilterParametrs.classList.remove('active');
            let filterBody = sourseFilterParametrs.getAttribute('data-body');
            if(filterBody == id && !tabBody.classList.contains('active')){
                tabBody.classList.add('active')
            }
        })
    }

    sourseFilterType.forEach(item => {
        item.addEventListener("click", function(){
            let header = item.getAttribute("data-header");
            getByTabHeader(header);
        })
    })
}