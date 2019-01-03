// Main Vue Controller
var app = new Vue({
  el: '#app',
  data: {
    title: 'JPLX Advent Calendar 2018',
    posts: [],
  },
  components: {
    'entry': entryComponent,
    'calendar': calendarComponent,
    'page-header': headerComponent,
  },
});


// Reads through Entries directory for all entries
// and appends them to the posts array

// Entries are formatted as such:
// Username
// AvatarURL (In Avatars folder)
// HTML Text

for(var iter = 11; iter <= 33; ++iter) {
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
        var date = currentIter;
        var month = 'December';
        if (date > 31) {
          date = 1;
          month = 'January';
        }
        Vue.set(app.posts, currentIter - 11, {
          username,
          avatarURL,
          text,
          date,
          month,
          id: date,
        });
      }
    };
  })();

  xhr.send();
}



