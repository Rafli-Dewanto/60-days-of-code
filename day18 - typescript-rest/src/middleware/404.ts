import { Request, Response, NextFunction } from 'express'

const notfound = (_req: Request, res: Response, _next: NextFunction) => {
        res.status(404).json({
            status: 'not found',
            message: 'Resource not found'
        })
}

export default notfound;