import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.4.5"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm")
	kotlin("plugin.spring") version "1.4.32"
	application
}

group = "br.com.zup"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

dependencies {
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("br.com.zup.beagle:beagle-grpc-backend:0.0.2-maximo")
	implementation("net.devh:grpc-server-spring-boot-starter:2.11.0.RELEASE")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

application {
	mainClass.set("br.com.zup.grpcbff.GrpcBffApplicationKt")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
