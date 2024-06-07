import {Howl, Howler} from 'howler';

export default function () {
    const arr = []
    arr[0] = new Howl({src: ['/sounds/true.mp3'], html5: true});
    arr[1] = new Howl({src: ['/sounds/false.mp3'], html5: true});
    arr[2] = new Howl({src: ['/sounds/select.mp3'], html5: true});
    arr[3] = new Howl({src: ['/sounds/start.mp3'], html5: true});
    arr[4] = new Howl({src: ['/sounds/time.mp3'], html5: true});

    const soundSetVolume = (newVolume) => {
        Howler.volume(newVolume ? 1 : 0);
    }

    const soundStart = (selectNumber) => {
        arr[selectNumber].play()
    }

    return {
        soundStart,
        soundSetVolume
    };
}
