package br.com.zup.grpcbff

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class GrpcBffApplication

fun main(args: Array<String>) {
	runApplication<GrpcBffApplication>(*args)
}
