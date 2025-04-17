export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audioSrc: string;
  duration: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Teenage Dream",
    artist: "Katy Perry",
    album: "Teenage Dream",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/teenage-dream.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/teenage-dream.mp3",
    duration: "3:48"
  },
  {
    id: 2,
    title: "Counting Stars",
    artist: "OneRepublic",
    album: "Native",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/counting-stars.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/counting-stars.mp3",
    duration: "4:17"
  },
  {
    id: 3,
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
<<<<<<< HEAD
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/as-it-was.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/as-it-was.mp3",
=======
    cover: "https://media.githubusercontent.com/media/Dinoco711/sonance-4/refs/heads/main/assets/cover/as-it-was.jpg",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-4/refs/heads/main/src/app/assets/songs/as-it-was.mp3",
>>>>>>> b72724972777f710010c2f4beff1f615fff456ae
    duration: "2:47"
  },
  {
    id: 4,
    title: "Queen of the Cascades",
    artist: "Seatbelt",
    album: "Night Drive",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/queen-of-the-cascades.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/queen-of-the-cascades.mp3",
    duration: "3:42"
  },
  {
    id: 5,
    title: "Pompeii",
    artist: "Bastille",
    album: "Bad Blood",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/pompeii.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/pompeii.mp3",
    duration: "3:53"
  },
  {
    id: 6,
    title: "Way Down We Go",
    artist: "KALEO",
    album: "A/B",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/way-down-we-go.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/way-down-we-go.mp3",
    duration: "3:39"
  },
  {
    id: 7,
    title: "Snap",
    artist: "Rosa Linn",
    album: "SNAP",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/snap.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/snap.mp3",
    duration: "2:58"
  },
  {
    id: 8,
    title: "Make You Mine",
    artist: "PUBLIC",
    album: "Make You Mine",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/make-you-mine.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/make-you-mine.mp3",
    duration: "3:25"
  },
  {
    id: 9,
    title: "Coastline",
    artist: "Hollow Coves",
    album: "Wanderlust",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/coastline.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/coastline.mp3",
    duration: "4:01"
  },
  {
    id: 10,
    title: "I Think They Call This Love",
    artist: "Louyah",
    album: "I Think They Call This Love",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/i-think-they-call-this-love.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/i-think-they-call-this-love.mp3",
    duration: "3:27"
  },
  {
    id: 11,
    title: "In My Room",
    artist: "Jacob Collier",
    album: "Djesse Vol. 1",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/in-my-room.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/in-my-room.mp3",
    duration: "3:12"
  },
  {
    id: 12,
    title: "We Fell In Love In October",
    artist: "Girl in Red",
    album: "Chapter 1",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/we-fell-in-love-in-october.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/we-fell-in-love-in-october.mp3",
    duration: "2:56"
  },
  {
    id: 13,
    title: "Notion",
    artist: "The Rare Occasions",
    album: "Notion",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/notion.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/notion.mp3",
    duration: "3:27"
  },
  {
    id: 14,
    title: "Lights Are On",
    artist: "Tom Rosenthal",
    album: "Keep a Private Room Behind the Shop",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/lights-are-on.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/lights-are-on.mp3",
    duration: "3:31"
  },
  {
    id: 15,
    title: "Spirits",
    artist: "The Strumbellas",
    album: "Hope",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/spirits.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/spirits.mp3",
    duration: "3:23"
  },
  {
    id: 16,
    title: "Where'd All The Time Go",
    artist: "Dr. Dog",
    album: "Shame, Shame",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/whered-all-the-time-go.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/whered-all-the-time-go.mp3",
    duration: "4:11"
  },
  {
    id: 17,
    title: "Blue",
    artist: "Eiffel 65",
    album: "Europop",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/blue.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/blue.mp3",
    duration: "3:40"
  },
  {
    id: 18,
    title: "Je Te Laisserai Des Mots",
    artist: "Patrick Watson",
    album: "Wooden Arms",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/je-te-laisserai-des-mots.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/je-te-laisserai-des-mots.mp3",
    duration: "2:47"
  },
  {
    id: 19,
    title: "Evergreen (feat. CAAMP)",
    artist: "Mt. Joy",
    album: "Orange Blood",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/evergreen-(feat-caamp).jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/evergreen-(feat-caamp).mp3",
    duration: "3:22"
  },
  {
    id: 20,
    title: "Love In The Dark",
    artist: "Adele",
    album: "25",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/love-in-the-dark.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/love-in-the-dark.mp3",
    duration: "4:46"
  },
  {
    id: 21,
    title: "Sunsetz",
    artist: "Cigarettes After Sex",
    album: "Cigarettes After Sex",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/sunsetz.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/sunsetz.mp3",
    duration: "4:28"
  },
  {
    id: 22,
    title: "Where's My Love (Acoustic)",
    artist: "SYML",
    album: "Where's My Love",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/wheres-my-love-(acoustic).jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/wheres-my-love-(acoustic).mp3",
    duration: "3:38"
  },
  {
    id: 23,
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    album: "Die With A Smile",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/die-with-a-smile.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/die-with-a-smile.mp3",
    duration: "3:36"
  },
  {
    id: 24,
    title: "Beanie",
    artist: "Yokai",
    album: "Beanie",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/beanie.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/beanie.mp3",
    duration: "2:24"
  },
  {
    id: 25,
    title: "Riptide",
    artist: "Vance Joy",
    album: "Dream Your Life Away",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/riptide.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/riptide.mp3",
    duration: "3:24"
  },
  {
    id: 26,
    title: "Somewhere Only We Know",
    artist: "Keane",
    album: "Hopes and Fears",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/somewhere-only-we-know.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/somewhere-only-we-know.mp3",
    duration: "3:57"
  },
  {
    id: 27,
    title: "End of Beginning",
    artist: "Djo",
    album: "Decide",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/end-of-beginning.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/end-of-beginning.mp3",
    duration: "2:44"
  },
  {
    id: 28,
    title: "Those Eyes",
    artist: "New West",
    album: "Those Eyes",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/those-eyes.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/those-eyes.mp3",
    duration: "3:42"
  },
  {
    id: 29,
    title: "Sweater Weather",
    artist: "The Neighbourhood",
    album: "I Love You.",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/sweater-weather.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/sweater-weather.mp3",
    duration: "4:00"
  },
  {
    id: 30,
    title: "The Night We Met",
    artist: "Lord Huron",
    album: "Strange Trails",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/the-night-we-met.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/the-night-we-met.mp3",
    duration: "3:28"
  },
  {
    id: 31,
    title: "Daylight",
    artist: "Taylor Swift",
    album: "Lover",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/daylight.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/daylight.mp3",
    duration: "4:53"
  },
  {
    id: 32,
    title: "Sailor Song",
    artist: "Autoheart",
    album: "Punch",
    cover: "https://github.com/Dinoco711/sonance-assets/blob/main/cover/sailor-song.jpg?raw=true",
    audioSrc: "https://media.githubusercontent.com/media/Dinoco711/sonance-assets/refs/heads/main/songs/sailor-song.mp3",
    duration: "3:39"
  }
]; 
