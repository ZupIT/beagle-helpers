# Beagle Scaffold iOS
<hr>

Here you will find the **Beagle-Scaffold** library to help you start a project using Beagle in iOS.

**It's recommended for beginners.**

This libs will hold almost all necessary configuration to add Beagle into an iOS project

### Requirements
Before you start to configure Beagle for your iOS system, you'll need a Macbook with Xcode installed. 

### Getting started
<hr>

This tutorial will configure Beagle from the Start.

Step 1: Create a new app project using Xcode.

Step 2: First things first, we are going to be using a view code approach here, so we need to delete all references to _main.storyboard_, which is the way that Xcode usually set your project to initialize. These references are localized at:

* info.plist > Application Scene Manifest > Scene Configuration > Application Session Role > Item 0 (Default Configuration) > Storyboard Name
* info.plist > Main storyboard file base name
* yourProject.xcodeproj > General > Main Interface

Delete these three. The third you just have to erase and confirm.

Step 3: Add BeagleScaffold as a dependency of your project using CocoaPods:
- https://cocoapods.org/pods/BeagleScaffold

```
target 'MyApp' do
  pod 'BeagleScaffold'
end
```

If you're not familiar with CocoaPods, check their [documentation](https://guides.cocoapods.org/).

Also add the YogaKit dependency to your project via CocoaPods, but point to our repo because we need some changes that weren't merged on their official repository. Like so:

```
pod 'YogaKit', :git => 'https://github.com/ZupIT/YogaKit'
```

BeagleScaffold has default implementations of a Network layer, Cache and Logger for you, embedded in [BeagleDefaults](https://github.com/ZupIT/beagle-helpers/tree/main/iOS/beagle-defaults).

Step 4: Add to your appDelegate a variable called _window_ that is a _UIWindow?_. Initialize it, make it's rootViewController our _BeagleScaffoldDemoViewController_ and call a function called _makeKeyAndVisible()_. Like the following:

```
var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = BeagleScaffoldDemoViewController
        window?.makeKeyAndVisible()
        
        return true
    }
```

Step 5: Now for the last step to run the application, just call our function named _start()_ from the class _BeagleConfig_, just before initializing the variable _window_. Your code should be like this:

```
var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    
        BeagleConfig.start()
        
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = BeagleScaffoldDemoViewController
        window?.makeKeyAndVisible()
        
        return true
    }
```
Step 6: Run your project, and you should see a sample screen with all Beagle components on your simulator.


<hr>

##### For more on Beagle: Please check our [Beagle](https://github.com/ZupIT/beagle) repository
##### For more on Beagle-Scaffold: Please check our [Beagle-Scaffold](https://docs.usebeagle.io/home/) documentation 