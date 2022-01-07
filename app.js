// let ajax = new XMLHttpRequest(); //let=변수 : 뒤 ajax에 다른 값을 넣을 수 있음

const ajax = new XMLHttpRequest(); //const=상수 : 값을 변경할 일 없을때 씀

ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false);
ajax.send(); //데이터를 가져옴

//ajax.open(-,-,boolean=false) : ajax boolean(논리)가 false 라 함은 동기적으로 처리하겠다는 말!
//ajax:비동기적인 웹 앱의 제작을 위한 조합을 이용하는 웹 개발 기법 (HTML+CSS)or(DOM+JavaScript)or(XML,XSLT,XMLHttpRequest)


const newsFeed = JSON.parse(ajax.response); // JSON.parse : 괄호안의 JSON 데이터 값을 객체로 바꾼다 == 데이터를 Javascript에서 다룰수 있는 형태로 바꿈
const ul = document.createElement('ul') // createElement : 태그를 만든다 // = ul태그를만든다

for(let i = 0; i < 10; i++) {

    
      <li>${newsFeed[i].title}</li>
//반복문 : for
//백틱(``) : 문자열을 만드는것

}

document.getElementById('root').appendChigld(ul);
