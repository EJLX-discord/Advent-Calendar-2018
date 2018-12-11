

Vue.component('entry', {
  props: {
    username: String, 
    avatarURL: String, 
    date: Number,
    text: String,
  },
  methods: {
    getImageURL: function() {
      return 'Avatars/' + this.avatarURL;
    },
  },
  template: `
  <article class="journal" v:id="date">
    <div class="journal__info">
      <div class="journal__user">        
        <img v-bind:src="getImageURL()" class="journal__avatar"/>
        <h2>{{ username }}</h2>
      </div>
      <div class="journal__date">
        December {{date}}
      </div>
    </div>
    <div class="journal__content" v-html="text">
      {{ text }}
    </div>
  </article>
  `,

});

var app = new Vue({
  el: '#app',
  data: {
    title: 'JPLX Advent Calendar 2018',
    posts: [],
  }
});


// Reads through Entries directory for all entries
for(var iter = 11; iter <= 31; ++iter) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './Entries/entry-' + iter + '.html');

  // Closure to save iteration
  xhr.onload = 
  (function() {
    var currentIter = iter;
    return function() {
      if(this.response[1] === '!') {
        console.log('File with number ' + currentIter + ' does not exist.');
      } else {
        var nameEndIdx = this.response.indexOf('\n');
        var username = this.response.slice(0, nameEndIdx);
        var avatarEndIdx = this.response.indexOf('\n', nameEndIdx + 1);
        var avatarURL = this.response.slice(nameEndIdx, avatarEndIdx);
        var text = this.response.substr(avatarEndIdx);
        Vue.set(app.posts, currentIter - 11, {
          username,
          avatarURL,
          date: currentIter, 
          text,
          id: currentIter,
        });
      }
    };
  })();
  xhr.send();
}


