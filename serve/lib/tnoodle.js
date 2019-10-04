const axios = require('axios')

const tnoodle  = (function(){
    const baseUrl = 'http://solarsunrise.cn:2014/'
    const puzzlelistUrl = 'puzzles/.json'
    const allPuzzleName = [
        '222',
        '333',
        '333fm',
        '333ni',
        '444fast',
        '444',
        '444ni',
        '555',
        '555ni',
        '666',
        '777',
        'clock',
        'minx',
        'pyram',
        'skewb',
        'sq1',
        'sq1fast'
    ]


    function getPuzzlelist(){
        return baseUrl + puzzlelistUrl
    }


    // 生成一个打乱
    const scrambleCommandUrl = 'scramble/'
    const scrambleDataType = '.txt'
    async function getScrmable(puzzleName,number){
        const scrambleNumber = number ? '*'+number : ''
        const fullUrl =  baseUrl + scrambleCommandUrl + scrambleDataType + '?=' + puzzleName + scrambleNumber
        // return fullUrl
        let res =await axios.get(fullUrl)
        // return res.data
        return new Promise((resolve)=>{
            resolve(res.data)
        })
    }


    // 从打乱生成一个对应的打乱图片
    const imageCommandUrl = 'view/'
    const imageFormat = '.svg'
    const imageScramble = '?scramble='
    function getImage(scrambletxt,puzzleName){
        puzzleName = puzzleName || '333'
        return baseUrl + imageCommandUrl + puzzleName +imageFormat + imageScramble + encodeURIComponent(scrambletxt)
    }
    

    return {
        getPuzzlelist : getPuzzlelist,
        getScrmable : getScrmable,
        getImage : getImage

    }
})()


module.exports = tnoodle