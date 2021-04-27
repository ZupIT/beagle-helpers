package br.com.zup.grpc

import beagle.Messages
import br.com.zup.beagle.serialization.jackson.BeagleSerializationUtil
import com.fasterxml.jackson.annotation.JsonInclude

private fun asJsonString(value: Any): String {
    return BeagleSerializationUtil.beagleObjectMapper().writeValueAsString(value)
}

private fun buildDataContext(context: Map<String, Any>): Messages.DataContext {
    val messageBuilder = Messages.DataContext.newBuilder().setId(context["id"] as String)
    if (context["value"] != null) {
        messageBuilder.value = asJsonString(context["value"]!!)
    }
    return messageBuilder.build()
}

private fun serializeNodeAttributes(jsonMap: MutableMap<String, Any>): Map<String, Any> {
    val skip = listOf("_beagleComponent_", "context", "id", "style", "children", "child")
    val attributes = HashMap<String, Any>()
    jsonMap.forEach {
        if (!skip.contains(it.key)) attributes[it.key] = it.value
    }
    return attributes
}

private fun buildNode(jsonMap: MutableMap<String, Any>): Messages.ViewNode {
    val messageBuilder = Messages
        .ViewNode
        .newBuilder()
        .setBeagleComponent(jsonMap["_beagleComponent_"] as String)

    if (jsonMap["id"] != null) messageBuilder.id = jsonMap["id"] as String
    if (jsonMap["context"] != null) messageBuilder.context = buildDataContext(jsonMap["context"] as Map<String, Any>)
    if (jsonMap["style"] != null) messageBuilder.style = asJsonString(jsonMap["style"]!!)
    if (jsonMap["child"] != null) messageBuilder.child = buildNode(jsonMap["child"] as MutableMap<String, Any>)

    val attributes = serializeNodeAttributes(jsonMap)
    if (attributes.isNotEmpty()) messageBuilder.attributes = asJsonString(attributes)

    val children = jsonMap["children"] as List<MutableMap<String, Any>>?
    if (children?.isEmpty() == false) {
        children.forEach {
            messageBuilder.addChildren(buildNode(it))
        }
    }

    return messageBuilder.build()
}

fun asGrpcView(widget: Any): Messages.ViewNode {
    val mapper = BeagleSerializationUtil.beagleObjectMapper()
    mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
    val jsonMap = mapper.convertValue(widget, MutableMap::class.java) as MutableMap<String, Any>
    try {
        return buildNode(jsonMap)
    } catch (err: Throwable) {
        err.printStackTrace()
        throw err
    }
}
