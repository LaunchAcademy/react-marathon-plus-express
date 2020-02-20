const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const hbsMiddleware = require("express-handlebars")
const fs = require("fs")
const _ = require("lodash")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const playlistPath = path.join(__dirname, "../playlist.json")

const playlistJson = () => {
  return JSON.parse(fs.readFileSync(playlistPath).toString())
}

const newPlaylistId = () => {
  const playlist = playlistJson()
  const maxPlaylist = _.maxBy(playlist, playlist => playlist.id)
  return maxPlaylist.id + 1
}

const updatePlaylistDataJson = (playlist) => {
  const data = playlist
  fs.writeFileSync(playlistPath, JSON.stringify(data))
}

app.get("/", (req, res) => {
  res.render("home")
})

// required for step three
// app.get("/api/v1/launchers", (req, res) => {
//   const jsonString = fs.readFileSync(path.join(__dirname, "../launchers.json")).toString()
//   res.json(JSON.parse(jsonString))
// })

app.get("/api/v1/playlist", (req, res) => {
  const jsonString = fs.readFileSync(path.join(__dirname, "../playlist.json")).toString()
  res.json(JSON.parse(jsonString))
})


app.post("/api/v1/playlist", (req, res) => {
  const {playlist, answer} = req.body
  if (playlist && answer){
    const newPlaylist = {
      id: newPlaylistId(),
      playlist: playlist,
      answer: answer
    }
    const playlist = playlistJson()
    playlist.push(newPlaylist)
    updatePlaylistDataJson(playlist)
    res.status(201).json(newPlaylist)
  } else {
    res.status(422).json({ name: ["Fields can't be blank"] })
  }
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

module.exports = app
