const fs = require('fs')

const UPLOADS_PATH = process.env.UPLOADS

module.exports = res => {

    fs.readdir(UPLOADS_PATH, (error, files) => {
    
        if(error)
        {
            return res.status(500).json({
                success: false,
                error_code: 500,
                message: "There is an issue on fetching files",
                error
            })
        }

        return res.status(200).json({
            success: true,
            message: "Files have fetched",
            files
        })

    })
}