const response = (statusCode, data, message, res) => {
    res.status(statusCode).json(
        {
            statusCode,
            message,
            payload: data,
            metadata: {
                prev: "",
                next: "",
                current: ""
            }
        }
    )
}

module.exports = { response }