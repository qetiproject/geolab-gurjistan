if(checkPage('search')) {
    // search page
  let peopleList = document.querySelector('.search_content');
  let alphabetList = document.querySelector('.alphabet');
  let alphabet = [];
  let people = [];

  getPeople();
  getAlphabet();

   populatePeople = (peopleArr, fromSearch) =>{
    alphabet.forEach(i => {
      if(!fromSearch) {      
        alphabetList.innerHTML += `
          <li class="alphabetItem">
            <a onclick="filterPeopleWithAlphabet('${i.id}')" class="alphabet_${i.id}">${i.value}</a>
          </li>`;
      }
      peopleList.innerHTML += `
      <li class="search_content_list peopleList_${i.id}">${i.value}<ul class="people_${i.id}"></ul>
      <button onclick="showMorePeople('${i.id}')" class="btn_${i.id} moreInfo">სრულად</button></li>`;

      let selectedPeople = document.querySelector(`.people_${i.id}`);
      let filteredPeople = peopleArr.filter( p => p.surname.slice(0, 1) === i.value);
      let maxResultCount = 10;
      let selectedbtn = document.querySelector(`.btn_${i.id}`);
     
      
      if(maxResultCount >= filteredPeople.length) {
        selectedbtn.style.display = 'none';
      }

      filteredPeople.forEach((p, index) => {
        selectedPeople.innerHTML += `
         <li class="personData"><a href="personDetailInfo.html">${p.name} ${p.surname}</a></li>`;
         if(index < maxResultCount) {
            Array.from(selectedPeople.children).forEach(i => {
              i.style.display = 'block';
            })
         }
      });
    });
  }

  async function getPeople() {
    const response = await fetch('../storage/people.json');
    people = await response.json();
    alphabet.length ? populatePeople(people, false) : '';
  }
   filterPeopleWithAlphabet = (id) => {
   
    let selectedPeople = document.querySelector(`.peopleList_${id}`);
    let peopleContentList = document.querySelectorAll('.search_content_list');
    peopleContentList.forEach(i => {
      i.style.display = 'none';
    });
   
    selectedPeople.style.display = 'block';
  }

  showMorePeople = (id) => {
    let selectedPeople = document.querySelector(`.peopleList_${id}`);
    let selectedPeopleList = Array.from(selectedPeople.firstElementChild.children);
    let lastShownElementIndex = 0;
    selectedPeopleList.forEach((i, index) => {
      if(i.style.display == 'block') {
        lastShownElementIndex = index;
      }
    });

    lastShownElementIndex += 1;
    selectedPeopleList.forEach((i, index) => {
      if(index <= lastShownElementIndex) {
        i.style.display = 'block'
        if(index == selectedPeopleList.length - 1) {
          let selectedbtn = document.querySelector(`.btn_${id}`);
          selectedbtn.style.display = 'none';
        }
      }
    });
  }

  async function getAlphabet() {
    const response = await fetch('../storage/alphabet.json');
    alphabet = await response.json();
    people.length ? populatePeople(people, false) : '';
  }

  //search
  const search = document.getElementById('search');
  search.addEventListener('keyup', function(e) {
    e.preventDefault();
    let searchPerson = [...people];
    if(this.value) {
      searchPerson = people.filter(p => p.surname.indexOf(this.value) >= 0 ||  p.name.indexOf(this.value) >= 0);
    }
    peopleList.innerHTML = '';
    populatePeople(searchPerson, true);
  });
}