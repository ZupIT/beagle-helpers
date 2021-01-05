
#
# Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

Pod::Spec.new do |spec|

# ―――  Spec Metadata  ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  spec.name = "BeagleScaffold"

  spec.version = '1.0.0'

  spec.summary = "A more user friendly version of our main Framework Beagle."
  spec.description = <<-DESC
    Here you'll already have default implementations for a Network layer, Cache control, Log and more. Allowing you to see what Beagle can do just after installing this framework.
  DESC
  spec.homepage = "https://docs.usebeagle.io"

# ―――  Spec License  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  spec.license = "Apache License 2.0"

# ――― Author Metadata  ――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  spec.author = "Zup IT"

# ――― Platform Specifics ――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  spec.platform = :ios, "10.0"
  spec.swift_version = "5.0"

# ――― Source Location ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  tag = spec.version.to_s
  source = { :git => "https://github.com/ZupIT/beagle-helpers.git", :tag => tag }
  spec.source = source

# ――― Source Code ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #

  # ――― Beagle Scaffold ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― #
  
  spec.subspec 'BeagleScaffold' do |beagleScaffold|
    path_source = 'BeagleScaffold/iOS/Sources'

    beagleScaffold.source_files = [
      path_source + '/**/*.swift'
    ]

    beagleScaffold.exclude_files = [
      path_source + "/**/Test/**/*.swift",
      path_source + "/**/Tests/**/*.swift",
      path_source + "/**/*Test*.swift"
    ]
    
    beagleScaffold.frameworks = 'Foundation'
    beagleScaffold.dependency 'BeagleDefaults'
    
  end
  
  
end
