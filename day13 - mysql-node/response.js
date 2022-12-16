const response = (statusCode, data, message, res) => {
    res.status(statusCode).json(
        {
            payload: data,
            statusCode,
            message,
            metadata: {
                prev: "",
                next: "",
                current: ""
            },
        },
    )
}

module.exports = { response }