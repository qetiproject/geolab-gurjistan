if(checkPage('populatedArea')) {
    // populatedAreas page
  var populatedAreaList = document.querySelector('.search_content');
  let alphabetList = document.querySelector('.alphabet');
  let alphabet = [];
  let populatedArea = [];

  getpopulatedArea();
  getAlphabet();

   populatepopulatedArea = (populatedAreaArr, fromSearch) =>{
    alphabet.forEach(i => {
      if(!fromSearch) {        
        alphabetList.innerHTML += `
          <li class="alphabetItem"><a onclick="filterpopulatedAreaWithAlphabet('${i.id}')" class="alphabet_${i.id}">${i.value}</a></li>`;
      }
      populatedAreaList.innerHTML += `
      <li class="search_content_list populatedAreaList_${i.id}">${i.value}<ul class="populatedArea_${i.id}"></ul>
      <button onclick="showMorepopulatedArea('${i.id}')" class="btn_${i.id} moreInfo">სრულად</button></li>`;

      let selectedpopulatedArea = document.querySelector(`.populatedArea_${i.id}`);
      let filteredpopulatedArea = populatedAreaArr.filter( p => p.surname.slice(0, 1) === i.value);
      let maxResultCount = 10;
      let selectedbtn = document.querySelector(`.btn_${i.id}`);

      if(maxResultCount >= filteredpopulatedArea.length) {
        selectedbtn.style.display = 'none';
      }

      filteredpopulatedArea.forEach((p, index) => {
        selectedpopulatedArea.innerHTML += `
         <li class="personData"><a href="populatedAreaInfo.html">${p.name} ${p.surname}</a></li>`;
         if(index < maxResultCount) {
            Array.from(selectedpopulatedArea.children).forEach(i => {
              i.style.display = 'block';
            })
         }
      });
    });
  }
  async function getpopulatedArea() {
    const response = await fetch('../storage/populatedArea.json');
    populatedArea = await response.json();
    alphabet.length ? populatepopulatedArea(populatedArea, false) : '';
  }
  
   filterpopulatedAreaWithAlphabet = (id) => {
    let selectedpopulatedArea = document.querySelector(`.populatedAreaList_${id}`);
    let populatedAreaContentList = document.querySelectorAll('.search_content_list');
    populatedAreaContentList.forEach(i => {
      i.style.display = 'none';
    });
    selectedpopulatedArea.style.display = 'block';
  }

  showMorepopulatedArea = (id) => {
    let selectedpopulatedArea = document.querySelector(`.populatedAreaList_${id}`);
    let selectedpopulatedAreaList = Array.from(selectedpopulatedArea.firstElementChild.children);
    let lastShownElementIndex = 0;
    selectedpopulatedAreaList.forEach((i, index) => {
      if(i.style.display == 'block') {
        lastShownElementIndex = index;
      }
    });

    lastShownElementIndex += 1;
    selectedpopulatedAreaList.forEach((i, index) => {
      if(index <= lastShownElementIndex) {
        i.style.display = 'block'
        if(index == selectedpopulatedAreaList.length - 1) {
          let selectedbtn = document.querySelector(`.btn_${id}`);
          selectedbtn.style.display = 'none';
        }
      }
    });
  }

  async function getAlphabet() {
    const response = await fetch('../storage/alphabet.json');
    alphabet = await response.json();
    populatedArea.length ? populatepopulatedArea(populatedArea, false) : '';
  }

  //search
  const search = document.getElementById('search');
  search.addEventListener('keyup', function(e) {
    e.preventDefault();
    let searchPerson = [...populatedArea];
    if(this.value) {
      searchPerson = populatedArea.filter(p => p.surname.indexOf(this.value) >= 0 ||  p.name.indexOf(this.value) >= 0);
    }
    populatedAreaList.innerHTML = '';
    populatepopulatedArea(searchPerson, true);
  });
}