import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons'
import { Image } from 'react-native'

const IconImage = ({uri, size}) => (
  <Image 
    resizeMode='contain' 
    style={{ width: size, height: size }} 
    source={{ uri }} />
)
export const skillImg = {
  "AutoCAD": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_436876.png'} size={size}/>),
  "Algolia": (size) => (<FontAwesome5 name="algolia" size={size} color="black" />),
  "Android": (size) => (<AntDesign name="android1" size={size} color="black" />),
  "AngularJS": (size) => (<Fontisto name="angularjs" size={size} color="black" />),
  "Apache": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_234663.png'} size={size}/>),
  "Babel": (size) => (<MaterialCommunityIcons name="babel" size={size} color="black" />),
  "BitBucket": (size) => (<FontAwesome name="bitbucket" size={size} color="black" />),
  "Bootstrap": (size) => (<FontAwesome5 name="bootstrap" size={size} color="black" />),
  "Bower": (size) => (<Fontisto name="bower" size={size} color="black" />),
  "Spring Boot": (size) => (<IconImage uri={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdzone.com%2Fstorage%2Ftemp%2F12434118-spring-boot-logo.png&f=1&nofb=1'} size={size}/>),
  "Google Cloud": (size) => (<MaterialCommunityIcons name="google-cloud" size={size} color="black" />),
  "C": (size) => (<MaterialCommunityIcons name="language-c" size={size} color="black" />),
  "C#": (size) => (<MaterialCommunityIcons name="language-csharp" size={size} color="black" />),
  "C++": (size) => (<MaterialCommunityIcons name="language-cpp" size={size} color="black" />),
  "Clojure": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_436998.png'} size={size}/>),
  "CloudFlare": (size) => (<Fontisto name="cloudflare" size={size} color="black" />),
  "Cocoa": (size) => (<Fontisto name="cocoapods" size={size} color="black" />),
  "CSS": (size) => (<Ionicons name="logo-css3" size={size} color="black" />),
  "CoffeeScript": (size) => (<Fontisto name="coffeescript" size={size} color="black" />),
  "centOS": (size) => (<FontAwesome5 name="centos" size={size} color="black" />),
  "Delphi": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_437021.png'} size={size}/>),
  "DigitalOcean": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_288130.png'} size={size}/>),
  "Django": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_437022.png'} size={size}/>),
  "Docker": (size) => (<FontAwesome5 name="docker" size={size} color="black" />),
  "Erlang": (size) => (<FontAwesome5 name="erlang" size={size} color="black" />),
  "Ethereum": (size) => (<FontAwesome5 name="ethereum" size={size} color="black" />),
  "ExpressJS": (size) => (<IconImage uri={'http://olmedo-vera.fr/assets/outils/express.png'} size={size}/>),
  "Unreal Engine": (size) => (<Fontisto name="unreal-engine" size={size} color="black" />),
  "Electron": (size) => (<Ionicons name="logo-electron" size={size} color="black" />),
  "Chrome": (size) => (<AntDesign name="chrome" size={size} color="black" />),
  "PhotoShop":(size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_466059.png'} size={size}/>),
  "Illustrator": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_145815.png'} size={size}/>),
  "After Effect": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_145803.png'} size={size}/>),
  "Adobe": (size) => (<Fontisto name="adobe" size={size} color="black" />),
  "Firebase": (size) => (<Ionicons name="logo-firebase" size={size} color="black" />),
  "Flask": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_437027.png'} size={size}/>),
  "Flutter": (size) => (<IconImage uri={'https://seekicon.com/free-icon-download/flutter-icon_1.png'} size={size}/>),
  "Git": (size) => (<FontAwesome5 name="git-alt" size={size} color="black" />),
  "GitHub": (size) => (<AntDesign name="github" size={size} color="black" />),
  "GitLab": (size) => (<AntDesign name="gitlab" size={size} color="black" />),
  "Go": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_247883.png'} size={size}/>),
  "Gradle": (size) => (<IconImage uri={'https://dwglogo.com/wp-content/uploads/2017/12/Gradle_logo_02-1024x707.png'} size={size}/>),
  "GraphQL": (size) => (<MaterialCommunityIcons name="graphql" size={size} color="black" />),
  "Grunt": (size) => (<FontAwesome5 name="grunt" size={size} color="black" />),
  "Gulp": (size) => (<FontAwesome5 name="gulp" size={size} color="black" />),
  "Hadoop": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_436912.png'} size={size}/>),
  "Haskell": (size) => (<MaterialCommunityIcons name="language-haskell" size={size} color="black" />),
  "Heroku": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_435946.png'} size={size}/>),
  "HTML": (size) => (<AntDesign name="HTML" size={size} color="black" />),
  "Red Hat": (size) => (<FontAwesome5 name="redhat" size={size} color="black" />),
  "iOS": (size) => (<AntDesign name="apple1" size={size} color="black" />),
  "ibatis": (size) => (<IconImage uri={'https://raw.githubusercontent.com/CAST-Extend/resources/master/com.castsoftware.mybatis.png'} size={size}/>),
  "IBM Cloud": (size) => (<IconImage uri={'https://www.itopstimes.com/wp-content/uploads/2018/06/cloud.png'} size={size}/>),
  "Java": (size) => (<FontAwesome5 name="java" size={size} color="black" />),
  "JavaScript": (size) => (<Ionicons name="logo-javascript" size={size} color="black" />),
  "Jekyll": (size) => (<Fontisto name="jekyll" size={size} color="black" />),
  "Jenkins": (size) => (<FontAwesome5 name="jenkins" size={size} color="black" />),
  "jQuery": (size) => (<MaterialCommunityIcons name="jquery" size={size} color="black" />),
  "Jsfiddle": (size) => (<FontAwesome name="jsfiddle" size={size} color="black" />),
  "JIRA": (size) => (<FontAwesome5 name="jira" size={size} color="black" />),
  "Kafka": (size) => (<MaterialCommunityIcons name="apache-kafka" size={size} color="black" />),
  "Kotlin": (size) => (<MaterialCommunityIcons name="language-kotlin" size={size} color="black" />),
  "Kubernetes": (size) => (<MaterialCommunityIcons name="kubernetes" size={size} color="black" />),
  "Linux": (size) => (<FontAwesome name="linux" size={size} color="black" />),
  "Azure": (size) => (<MaterialCommunityIcons name="microsoft-azure" size={size} color="black" />),
  "Laravel": (size) => (<FontAwesome5 name="laravel" size={size} color="black" />),
  "Lua": (size) => (<MaterialCommunityIcons name="language-lua" size={size} color="black" />),
  "MariaDB": (size) => (<IconImage uri={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fmariadb-logo-black-and-white.png&f=1&nofb=1'} size={size}/>),
  "MATLAB": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_248150.png'} size={size}/>),
  "MongoDB": (size) => (<Fontisto name="mongodb" size={size} color="black" />),
  "MySQL": (size) => (<Fontisto name="mysql" size={size} color="black" />),
  "Ruby": (size) => (<MaterialCommunityIcons name="language-ruby" size={size} color="black" />),
  "Node.js": (size) => (<FontAwesome5 name="node-js" size={size} color="black" />),
  "React Native": (size) => (<FontAwesome5 name="react" size={size} color="black" />),
  "Nginx": (size) => (<Fontisto name="nginx" size={size} color="black" />),
  "Nuxt.js": (size) => (<MaterialCommunityIcons name="nuxt" size={size} color="black" />),
  "NVIDIA": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_145821.png'} size={size}/>),
  "Next.js": (size) => (<IconImage uri={'https://seeklogo.com/images/N/next-js-logo-7929BCD36F-seeklogo.com.png'} size={size}/>),
  "Netlify": (size) => (<IconImage uri={'https://www.netlify.com/img/press/logos/logomark.png'} size={size}/>),
  "Objective-C": (size) => (<AntDesign name="apple1" size={size} color="black" />),
  "OpenCV": (size) => (<IconImage uri={'http://dangerousprototypes.com/wp-content/media/2011/02/opencv-logo-300x277.png'} size={size}/>),
  "Oracle": (size) => (<Fontisto name="oracle" size={size} color="black" />),
  "Rails": (size) => (<MaterialCommunityIcons name="language-ruby-on-rails" size={size} color="black" />),
  "Perl": (size) => (<IconImage uri={'https://developer.fedoraproject.org/static/logo/perl.png'} size={size}/>),
  "PHP": (size) => (<MaterialCommunityIcons name="language-php" size={size} color="black" />),
  "PostgreSQL": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_436917.png'} size={size}/>),
  "Python": (size) => (<FontAwesome5 name="python" size={size} color="black" />),
  "Raspberry Pi": (size) => (<FontAwesome5 name="raspberry-pi" size={size} color="black" />),
  "PostCSS": (size) => (<IconImage uri={'https://raw.githubusercontent.com/sebastian-software/postcss-smart-import/HEAD/assets/postcss.png'} size={size}/>),
  "R": (size) => (<FontAwesome5 name="r-project" size={size} color="black" />),
  "ReactJS": (size) => (<FontAwesome5 name="react" size={size} color="black" />),
  "Redis": (size) => (<Fontisto name="redis" size={size} color="black" />),
  "Redux.js": (size) => (<Fontisto name="redux" size={size} color="black" />),
  "Rust": (size) => (<FontAwesome5 name="rust" size={size} color="black" />),
  "Sass": (size) => (<FontAwesome5 name="sass" size={size} color="black" />),
  "Scala": (size) => (<IconImage uri={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdwglogo.com%2Fwp-content%2Fuploads%2F2017%2F09%2F1300px-Scala_logo.png&f=1&nofb=1'} size={size}/>),
  "Shell": (size) => (<MaterialCommunityIcons name="powershell" size={size} color="black" />),
  "Spring": (size) => (<IconImage uri={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Fspring-3-logo-png-transparent.png&f=1&nofb=1'} size={size}/>),
  "SVN(Apache Subversion)": (size) => (<Fontisto name="svn" size={size} color="black" />),
  "Swift": (size) => (<Fontisto name="swift" size={size} color="black" />),
  "SQLite": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_436920.png'} size={size}/>),
  "Apache Tomcat": (size) => (<IconImage uri={'https://pic.onlinewebfonts.com/svg/img_145834.png'} size={size}/>),
  "TypeScript": (size) => (<MaterialCommunityIcons name="language-typescript" size={size} color="black" />),
  "Travis CI": (size) => (<Fontisto name="travis" size={size} color="black" />),
  "Ubuntu": (size) => (<FontAwesome5 name="ubuntu" size={size} color="black" />),
  "Unity": (size) => (<FontAwesome5 name="unity" size={size} color="black" />),
  "Unix": (size) => (<FontAwesome name="linux" size={size} color="black" />),
  "Vue.js": (size) => (<Ionicons name="logo-vue" size={size} color="black" />),
  "Webpack": (size) => (<MaterialCommunityIcons name="webpack" size={size} color="black" />),
  "WordPress": (size) => (<Fontisto name="wordpress" size={size} color="black" />),
  "WebRTC": (size) => (<MaterialCommunityIcons name="webrtc" size={size} color="black" />),
  "XML": (size) => (<MaterialCommunityIcons name="xml" size={size} color="black" />),
  "Yarn": (size) => (<FontAwesome5 name="yarn" size={size} color="black" />),
  "XAML" : (size) => (<MaterialCommunityIcons name="language-xaml" size={size} color="black" />)
}