package br.com.zup.grpc.exception

import java.lang.RuntimeException

class BeagleException(message: String): RuntimeException(message)