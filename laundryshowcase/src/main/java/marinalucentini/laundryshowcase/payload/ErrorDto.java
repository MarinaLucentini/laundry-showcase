package marinalucentini.laundryshowcase.payload;

import java.time.LocalDateTime;

public record ErrorDto(String message, LocalDateTime timestamp) {
}
