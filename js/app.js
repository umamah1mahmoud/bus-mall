'use strict';

const names=[
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];


const imagesSection=document.getElementById('imagesSection');
const firstImage=document.getElementById('firstImage');
const secondImage=document.getElementById('secondImage');
const thirdImage=document.getElementById('thirdImage');
const makeList=document.getElementById('makeList');
const viewResults=document.getElementById('viewResults');


function Product(name){

  this.name=name;
  this.views=0;
  this.votes=0;

  // path options:
  if(name === 'usb'){
    this.path= `./img/${name}.gif`;
  }else if(name === 'sweep'){
    this.path= `./img/${name}.png`;
  }else{
    this.path=`./img/${name}.jpg`;
  }

  Product.all.push(this);
}
Product.all=[];

for(let i=0;i<names.length;i++){
    new Product(names[i]);
};



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> RENDER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function render(){
  const firstIndex=randomNumber(0,Product.all.length-1);
  const firstRandomProduct=Product.all[firstIndex];
  firstImage.src=firstRandomProduct.path;
  firstImage.title=firstRandomProduct.name;
  firstImage.alt=firstRandomProduct.name;

  const secondIndex=randomNumber(0,Product.all.length-1);
  const secondRandomProduct=Product.all[secondIndex];
  secondImage.src=secondRandomProduct.path;
  secondImage.title=secondRandomProduct.name;
  secondImage.alt=secondRandomProduct.name;

  const thirdIndex=randomNumber(0,Product.all.length-1);
  const thirdRandomProduct=Product.all[thirdIndex];
  thirdImage.src=thirdRandomProduct.path;
  thirdImage.title=thirdRandomProduct.name;
  thirdImage.alt=thirdRandomProduct.name;


  Product.all[firstIndex].views++;
  Product.all[secondIndex].views++;
  Product.all[thirdIndex].views++;
  console.table(Product.all)


};





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EVENT LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

imagesSection.addEventListener('click',clickHandler);

let attempts=25;
function clickHandler(event){
  attempts-=1;
  event.preventDefault();
  if (event.target.id === 'firstImage' || event.target.id === 'secondImage'  || event.target.id === 'thirdImage'){
    for(let i=0;i<Product.all.length;i++){
      if (Product.all[i].name === event.target.title){
        Product.all[i].votes++;
        console.table(Product.all[i])
      }
    }
    render();
  }
  if(attempts===0){
    alert('You are done! Thank you for your time')
    imagesSection.removeEventListener('click',clickHandler);
    viewResults.addEventListener('click', createList);
    viewResults.addEventListener('click', createChart);
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>> RANDOM GENERATOR <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LIST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



function createList (event){
  let createUl= document.createElement('ul');
  makeList.appendChild(createUl);
  for ( let j=0; j< Product.all.length; j++){
    let createLi= document.createElement('li');
    createLi.textContent= Product.all[j].name + ' had ' + Product.all[j].votes + ' votes, and ' + Product.all[j].views + ' views.' ;
    createUl.appendChild(createLi);
    console.log(Product.all[j]);
  };
}



// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CHART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function createChart(){
  let context = document.getElementById('productsChart').getContext('2d');
  let getProductNames=[];
  let getProductVotes=[];
  let getProductViews=[];


  for(let i=0;i<Product.all.length;i++){
    getProductNames.push(Product.all[i].name);
  }
  for(let i=0;i<Product.all.length;i++){
    getProductVotes.push(Product.all[i].votes);
  }
  for(let i=0;i<Product.all.length;i++){
    getProductViews.push(Product.all[i].views);
  }
  
  let VoteTheme= ['rgb(163, 86, 56, 1)', 'rgb(224, 143, 98, 1)' , 'rgb(215, 199, 158, 1)', 'rgb(157, 171, 134, 1)','rgb(163, 86, 56, 1)', 'rgb(224, 143, 98, 1)' , 'rgb(215, 199, 158, 1)', 'rgb(157, 171, 134, 1)', 'rgb(163, 86, 56, 1)', 'rgb(224, 143, 98, 1)' , 'rgb(215, 199, 158, 1)', 'rgb(157, 171, 134, 1)', 'rgb(163, 86, 56, 1)', 'rgb(224, 143, 98, 1)' , 'rgb(215, 199, 158, 1)', 'rgb(157, 171, 134, 1)', 'rgb(163, 86, 56, 1)', 'rgb(224, 143, 98, 1)' , 'rgb(215, 199, 158, 1)', 'rgb(157, 171, 134, 1)'];
  let ViewTheme= ['rgb(163, 86, 56, 0.4)', 'rgb(224, 143, 98, 0.4)' , 'rgb(215, 199, 158, 0.4)', 'rgb(157, 171, 134, 0.4)','rgb(163, 86, 56, 0.4)', 'rgb(224, 143, 98, 0.4)' , 'rgb(215, 199, 158, 0.4)', 'rgb(157, 171, 134, 0.4)', 'rgb(163, 86, 56, 0.4)', 'rgb(224, 143, 98, 0.4)' , 'rgb(215, 199, 158, 0.4)', 'rgb(157, 171, 134, 0.4)', 'rgb(163, 86, 56, 0.4)', 'rgb(224, 143, 98, 0.4)' , 'rgb(215, 199, 158, 0.4)', 'rgb(157, 171, 134, 0.4)', 'rgb(163, 86, 56, 0.4)', 'rgb(224, 143, 98, 0.4)' , 'rgb(215, 199, 158, 0.4)', 'rgb(157, 171, 134, 0.4)'];
  let chartObject={
    // The type of chart we want to create
    type: 'horizontalBar',
    // The data for our dataset
    data: {
      labels:getProductNames,
      datasets: [{
        label: 'Product votes',
        data: getProductVotes,
        backgroundColor: VoteTheme,
        borderColor: 'rgb(157, 171, 134, 1)',
          
      },
      {
      label: 'Product views',
      data: getProductViews,
      backgroundColor: ViewTheme,
      borderColor: 'rgb(255, 99, 132)',
        
    },
    ]
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
        categoryPercentage: 0.5
      }]
  }
  }
}
  let chart = new Chart(context,chartObject);
  
}


render();