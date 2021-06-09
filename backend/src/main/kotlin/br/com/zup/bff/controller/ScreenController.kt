/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@file:Suppress("TooManyFunctions", "LongParameterList")

package br.com.zup.bff.controller

import br.com.zup.bff.service.SampleLazyComponentService
import br.com.zup.bff.constant.ACCESSIBILITY_SCREEN_ENDPOINT
import br.com.zup.bff.constant.NAVIGATION_TYPE_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_BAR_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_BAR_IMAGE_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_BAR_STYLE_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_BAR_TEXT_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_TYPE_STEP2_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_NAVIGATION_TYPE_STEP3_ENDPOINT
import br.com.zup.bff.constant.REPRESENTATION_PRESENT_ENDPOINT
import br.com.zup.bff.constant.SAMPLE_VIEW_ENDPOINT
import br.com.zup.bff.constant.SCREEN_ACTION_ADD_CHILDREN
import br.com.zup.bff.constant.SCREEN_ACTION_CLICK_ENDPOINT
import br.com.zup.bff.constant.SCREEN_ACTION_ENDPOINT
import br.com.zup.bff.constant.SCREEN_ANALYTICS_ENDPOINT
import br.com.zup.bff.constant.SCREEN_BFF_NETWORK_IMAGE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_BUILDER_ENDPOINT
import br.com.zup.bff.constant.SCREEN_BUTTON_ENDPOINT
import br.com.zup.bff.constant.SCREEN_COMPONENTS_ENDPOINT
import br.com.zup.bff.constant.SCREEN_COMPOSE_COMPONENT_ENDPOINT
import br.com.zup.bff.constant.SCREEN_CONTEXT_ENDPOINT
import br.com.zup.bff.constant.SCREEN_EXAMPLE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_FORM_ENDPOINT
import br.com.zup.bff.constant.SCREEN_IMAGE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_LAZY_COMPONENT_ENDPOINT
import br.com.zup.bff.constant.SCREEN_LIST_VIEW_ENDPOINT
import br.com.zup.bff.constant.SCREEN_NAVIGATION_BAR_ENDPOINT
import br.com.zup.bff.constant.SCREEN_NETWORK_IMAGE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_PAGE_VIEW_ENDPOINT
import br.com.zup.bff.constant.SCREEN_SAFE_AREA_ENDPOINT
import br.com.zup.bff.constant.SCREEN_SAFE_AREA_FALSE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_SAFE_AREA_TRUE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_SCROLL_VIEW_ENDPOINT
import br.com.zup.bff.constant.SCREEN_SIMPLE_FORM_ENDPOINT
import br.com.zup.bff.constant.SCREEN_TAB_BAR_ENDPOINT
import br.com.zup.bff.constant.SCREEN_TAB_VIEW_ENDPOINT
import br.com.zup.bff.constant.SCREEN_TEXT_ENDPOINT
import br.com.zup.bff.constant.SCREEN_TEXT_INPUT_ENDPOINT
import br.com.zup.bff.constant.SCREEN_TOUCHABLE_ENDPOINT
import br.com.zup.bff.constant.SCREEN_WEB_VIEW_ENDPOINT
import br.com.zup.bff.service.AccessibilityService
import br.com.zup.bff.service.AddChildrenService
import br.com.zup.bff.service.SampleActionClickService
import br.com.zup.bff.service.SampleActionService
import br.com.zup.bff.service.SampleAnalyticsService
import br.com.zup.bff.service.SampleButtonService
import br.com.zup.bff.service.SampleComponentsService
import br.com.zup.bff.service.SampleComposeComponentService
import br.com.zup.bff.service.SampleContextService
import br.com.zup.bff.service.SampleFormService
import br.com.zup.bff.service.SampleImageLocalService
import br.com.zup.bff.service.SampleImageRemoteService
import br.com.zup.bff.service.SampleListViewService
import br.com.zup.bff.service.SampleNavigationBarService
import br.com.zup.bff.service.SampleNavigationTypeService
import br.com.zup.bff.service.SamplePageViewService
import br.com.zup.bff.service.SampleSafeAreaService
import br.com.zup.bff.service.SampleScreenBuilderService
import br.com.zup.bff.service.SampleScrollViewService
import br.com.zup.bff.service.SampleSimpleFormService
import br.com.zup.bff.service.SampleTabBarService
import br.com.zup.bff.service.SampleTabViewService
import br.com.zup.bff.service.SampleTextService
import br.com.zup.bff.service.SampleTouchableService
import br.com.zup.bff.service.SampleViewService
import br.com.zup.bff.service.SampleWebViewService
import br.com.zup.bff.service.TextInputService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ScreenController(
        private val accessibilityService: AccessibilityService,
        private val sampleViewService: SampleViewService,
        private val sampleScreenBuilderService: SampleScreenBuilderService,
        private val sampleComponentsService: SampleComponentsService,
        private val sampleButtonService: SampleButtonService,
        private val sampleTextService: SampleTextService,
        private val sampleImageService: SampleImageLocalService,
        private val sampleTabViewService: SampleTabViewService,
        private val sampleTabBarService: SampleTabBarService,
        private val sampleListViewService: SampleListViewService,
        private val sampleScrollViewService: SampleScrollViewService,
        private val samplePageViewService: SamplePageViewService,
        private val sampleActionService: SampleActionService,
        private val sampleFormService: SampleFormService,
        private val sampleLazyComponentService: SampleLazyComponentService,
        private val sampleNavigationBarService: SampleNavigationBarService,
        private val sampleNavigationTypeService: SampleNavigationTypeService,
        private val sampleComposeComponentService: SampleComposeComponentService,
        private val sampleNetworkImageService: SampleImageRemoteService,
        private val sampleTouchableService: SampleTouchableService,
        private val sampleActionClickService: SampleActionClickService,
        private val sampleAnalyticsService: SampleAnalyticsService,
        private val sampleWebViewService: SampleWebViewService,
        private val sampleScreenContext: SampleContextService,
        private val sampleScreenSafeArea: SampleSafeAreaService,
        private val sampleScreenTextInput: TextInputService,
        private val sampleSimpleFormService: SampleSimpleFormService,
        private val sampleAddChildrenService: AddChildrenService
) {
    @GetMapping(ACCESSIBILITY_SCREEN_ENDPOINT)
    fun getAccessibilityView() = this.accessibilityService.createAccessibilityView()

    @GetMapping(SAMPLE_VIEW_ENDPOINT)
    fun getSampleView() = this.sampleViewService.createSampleView()

    @GetMapping(SCREEN_BUILDER_ENDPOINT)
    fun getScreenBuilder() = this.sampleScreenBuilderService.createScreenBuilder()

    @GetMapping(SCREEN_COMPONENTS_ENDPOINT)
    fun getSampleComponents() = this.sampleComponentsService.getCreateSampleComponentsView()

    @GetMapping(SCREEN_BUTTON_ENDPOINT)
    fun getSampleButtonView() = this.sampleButtonService.createButtonView()

    @GetMapping(SCREEN_TEXT_ENDPOINT)
    fun getSampleTextView() = this.sampleTextService.createTextView()

    @GetMapping(SCREEN_IMAGE_ENDPOINT)
    fun getSampleImageView() = this.sampleImageService.createImageLocal()

    @GetMapping(SCREEN_TAB_VIEW_ENDPOINT)
    fun getSampleTabViewView() = this.sampleTabViewService.createTabView()

    @GetMapping(SCREEN_TAB_BAR_ENDPOINT)
    fun getSampleTabBar() = this.sampleTabBarService.createTabBar()

    @GetMapping(SCREEN_LIST_VIEW_ENDPOINT)
    fun getSampleListView() = sampleListViewService.createListView()

    @GetMapping(SCREEN_SCROLL_VIEW_ENDPOINT)
    fun getScrollView() = sampleScrollViewService.createScrollView()

    @GetMapping(SCREEN_PAGE_VIEW_ENDPOINT)
    fun getPageView() = this.samplePageViewService.createPageView()

    @GetMapping(SCREEN_ACTION_ENDPOINT)
    fun getShowDialogAction() = this.sampleActionService.createAction()

    @GetMapping(SCREEN_FORM_ENDPOINT)
    fun getSampleFormView() = this.sampleFormService.createFormView()

    @GetMapping(SCREEN_LAZY_COMPONENT_ENDPOINT)
    fun getSampleLazyComponentController() = this.sampleLazyComponentService.createLazyComponent()

    @GetMapping(SCREEN_NAVIGATION_BAR_ENDPOINT)
    fun getSampleNavigationBarController() = this.sampleNavigationBarService.createNavigationBarView()

    @GetMapping(REPRESENTATION_NAVIGATION_BAR_ENDPOINT)
    fun getSampleNavigationBar() = this.sampleNavigationBarService.navigationBar()

    @GetMapping(REPRESENTATION_NAVIGATION_BAR_STYLE_ENDPOINT)
    fun getNavigationBarStyle() = this.sampleNavigationBarService.navigationBarStyle()

    @GetMapping(REPRESENTATION_NAVIGATION_BAR_TEXT_ENDPOINT)
    fun getNavigationBarText() = this.sampleNavigationBarService.navigationBarWithTextAsItems()

    @GetMapping(REPRESENTATION_NAVIGATION_BAR_IMAGE_ENDPOINT)
    fun getNavigationBarImage() = this.sampleNavigationBarService.navigationBarWithImageAsItem()

    @GetMapping(NAVIGATION_TYPE_ENDPOINT)
    fun getSampleNavigationTypeController() = this.sampleNavigationTypeService.createNavigationTypeView()

    @GetMapping(REPRESENTATION_NAVIGATION_TYPE_STEP2_ENDPOINT)
    fun getNavigationStep2() = this.sampleNavigationTypeService.step2()

    @GetMapping(REPRESENTATION_PRESENT_ENDPOINT)
    fun getNavigationPresentView() = this.sampleNavigationTypeService.presentView()

    @GetMapping(REPRESENTATION_NAVIGATION_TYPE_STEP3_ENDPOINT)
    fun getNavigationStep3() = this.sampleNavigationTypeService.step3()

    @GetMapping(SCREEN_COMPOSE_COMPONENT_ENDPOINT)
    fun getComposeComponent() = this.sampleComposeComponentService.createComposeComponentView()

    @GetMapping(SCREEN_NETWORK_IMAGE_ENDPOINT)
    fun getSampleNetworkImageView() = this.sampleNetworkImageService.createImageRemote()

    @GetMapping(SCREEN_BFF_NETWORK_IMAGE_ENDPOINT)
    fun getSampleBffNetworkImageView() = this.sampleNetworkImageService.createBffNetworkImage()

    @GetMapping(SCREEN_TOUCHABLE_ENDPOINT)
    fun getTouchableView() = this.sampleTouchableService.createTouchableView()

    @GetMapping(SCREEN_ACTION_CLICK_ENDPOINT)
    fun getSampleActionClickController() = this.sampleActionClickService.createActionClick()

    @GetMapping(SCREEN_EXAMPLE_ENDPOINT)
    fun getNavigationExample() = this.sampleActionService.getNavigateExample()

    @GetMapping(SCREEN_ANALYTICS_ENDPOINT)
    fun getAnalyticsExample() = this.sampleAnalyticsService.getAnalyticsExample()

    @GetMapping(SCREEN_WEB_VIEW_ENDPOINT)
    fun getSampleWebViewService() = this.sampleWebViewService.createWebView()

    @GetMapping(SCREEN_CONTEXT_ENDPOINT)
    fun getSampleContext() = this.sampleScreenContext.createScreenContext()

    @GetMapping(SCREEN_SAFE_AREA_ENDPOINT)
    fun getSampleSafeArea() = this.sampleScreenSafeArea.createSafeArea()

    @GetMapping(SCREEN_SAFE_AREA_TRUE_ENDPOINT)
    fun getSampleSafeAreaTrue() = this.sampleScreenSafeArea.createSafeAreaTrue()

    @GetMapping(SCREEN_SAFE_AREA_FALSE_ENDPOINT)
    fun getSampleSafeAreaFalse() = this.sampleScreenSafeArea.createSafeAreaFalse()

    @GetMapping(SCREEN_TEXT_INPUT_ENDPOINT)
    fun getSampleTextInput() = this.sampleScreenTextInput.createScreenTextInput()

    @GetMapping(SCREEN_SIMPLE_FORM_ENDPOINT)
    fun getSampleSimpleFormService() = this.sampleSimpleFormService.createSimpleForm()

    @GetMapping(SCREEN_ACTION_ADD_CHILDREN)
    fun getAddChildrenService() = this.sampleAddChildrenService.createAddChildrenScreen()
}