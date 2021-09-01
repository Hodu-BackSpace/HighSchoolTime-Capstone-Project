package hodubackspace.highschooltime.api.advice.exception.found;

public class NotFoundBoardException extends RuntimeException {
    public NotFoundBoardException() {
        super();
    }

    public NotFoundBoardException(String message) {
        super(message);
    }

    public NotFoundBoardException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundBoardException(Throwable cause) {
        super(cause);
    }

    protected NotFoundBoardException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}