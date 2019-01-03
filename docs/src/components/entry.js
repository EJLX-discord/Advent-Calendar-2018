var entryComponent = {
  props: {
    username: String, 
    avatarURL: String, 
    date: Number,
    month: String,
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
        {{month}} {{date}}
      </div>
    </div>
    <div class="journal__content" v-html="text">
      {{ text }}
    </div>
  </article>
  `,
}