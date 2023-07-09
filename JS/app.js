import { allSongs } from "./data.js";

let menu = document.querySelector('.menu')
let library = document.querySelector('.library')
let liked = document.querySelector('.liked')
let img_cover = document.querySelector('.img_cover')
let title = document.querySelector('.title')
let artist = document.querySelector('.artist')
let show_duration = document.querySelector('.show_duration')
let progressArea = document.querySelector('.song_time')
let initial_i = document.querySelector('.initial_i')
let last_i = document.querySelector('.last_i')
let play_b = document.querySelector('.play_b')
let play_f = document.querySelector('.play_f')
let play = document.querySelector('.play')
let volume_m = document.querySelector('.volume_m')
let volume_sign = document.querySelector('.volume_sign')
let volume_p = document.querySelector('.volume_p')
let track = document.createElement('audio')

let index_no = 0
let playing_song = false


let load_track = (index_no) => {
    track.src = allSongs[index_no].path
    title.innerHTML = allSongs[index_no].name
    img_cover.src = allSongs[index_no].img
    artist.innerHTML = allSongs[index_no].artist
    track.load()
}

load_track(index_no)

 
liked.onclick = () => {
    liked.classList.toggle('active')
    liked.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
}
let just_play = () => {
    if (playing_song === false) {
        playSong()
    } else {
        pauseSong()
    }
}
play.onclick = () => just_play()

let playSong = () => {
    track.play()
    playing_song = true
    play.src = 'img/icons/pause.svg'
}

let pauseSong = () => {
    track.pause()
    playing_song = false
    play.src = 'img/icons/play.svg'
}

let play_forward = () => {
    if (index_no < allSongs.length - 1) {
        index_no += 1
        load_track(index_no)
        playSong()
    } else {
        index_no = 0
        load_track(index_no)
        playSong()
            // screensaver()
    }
    liked.classList.remove('active')
}
play_f.onclick = () => play_forward()

let play_backward = () => {
    if (index_no > 0) {
        index_no -= 1
        load_track(index_no)
        playSong()
    } else {
        index_no = allSongs.length
        load_track(index_no)
        playSong()
    }
    liked.classList.remove('active')
}
play_b.onclick = () => play_backward()


track.addEventListener('timeupdate', (e) => {
    let currentTime = e.target.currentTime
    let musicDuration = e.target.duration
    let position = currentTime / musicDuration
    show_duration.style.width = position * 100 + '%'
    
    track.addEventListener('timeupdate', () => {
        let audioDuration = track.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        last_i.innerText = `${totalMin}:${totalSec}`

        
        let CurrentMin = Math.floor(currentTime / 60)
        let CurrentSec = Math.floor(currentTime % 60)
        if (CurrentSec < 10) {
            CurrentSec = `0${CurrentSec}`
        }
        initial_i.innerText = `${CurrentMin}:${CurrentSec}`
        
    })
    
    if (track.ended) {
        play_forward()
    }
})

let screensaver = () => {
    let handle = document.querySelector('.handle')
    for (let i = 0; i < 3; i++) {
        let divs = document.createElement('div')
        handle.append(divs)
    }
}

progressArea.onclick = (e) => {
    let progressWidth = progressArea.clientWidth
    let clicked = e.offsetX
    let songDuration = track.duration
    track.currentTime = (clicked / progressWidth) * songDuration
    playSong()
}

let decreaseVolume = () => {
    track.volume -= 0.2
}
volume_m.onclick = () => decreaseVolume()

let increaseVolume = () => {
    track.volume += 0.2
}
volume_p.onclick = () => increaseVolume()

volume_sign.onclick = () => {
    if (track.volume === 1) {
        track.volume = 0
        volume_sign.src = 'img/icons/volume-x.svg'
    } else {
        track.volume = 1
        volume_sign.src = 'img/icons/volume-2.svg'
    }
}

let music_list = () => {
    library.innerHTML = ``
    library.classList.toggle('active_l')
    if (library.classList.contains('active_l')) {
        library.classList.remove('active_2')

    }else{
        library.classList.add('active_2')
    }
    
    for (let item of allSongs) {
        let list = document.createElement('div')
        list.classList.add('list')
        list.setAttribute('id', item.id)
        
        let left_side = document.createElement('div')
        left_side.classList.add('left-side')
        
        let right_side = document.createElement('div')
        right_side.classList.add('right-side')
        
        let h5 = document.createElement('h5')
        let h6 = document.createElement('h6')
        let duration = document.createElement('p')
        let audio = document.createElement('audio')
        audio.src = item.path
        
        let handle = document.createElement('div')
        handle.classList.add('handle')
        
        // audio.addEventListener('timeupdate', () => {
            // //     let audioDuration = audio.duration
            // //     let totalMin = Math.floor(audioDuration / 60)
            // //     let totalSec = Math.floor(audioDuration % 60)
        // //     if (totalSec < 10) {
        // //         totalSec = `0${totalSec}`
        // //     }
        // //     duration.innerText = `${totalMin}:${totalSec}`
        // // })

        h5.innerText = item.name
        h6.innerText = item.artist
        
        right_side.append(duration, audio, handle)
        left_side.append(h5, h6)
        list.append(left_side, right_side)
        library.append(list)
        
        let lists = document.querySelectorAll('.list')
        for (let item of lists) {
            item.onclick = () => {
                let musicIndex = item.getAttribute('id')
                load_track(musicIndex)
                playSong()
            }
        }
    }
}
menu.onclick = () => music_list(index_no)
