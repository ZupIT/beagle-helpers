package br.com.zup.bff.exception

import br.com.zup.bff.dto.ErrorResponse
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ExceptionHandler() : ResponseEntityExceptionHandler() {

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
@ExceptionHandler(Exception::class)
    fun unexpectedException(exception:Exception)= ErrorResponse()
}