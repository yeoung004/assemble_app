module.exports = {
  AgreeModal: {
    term: 'Terms and Conditions',
    age: 'I am at least 18 years old',
    agree: 'I agree',
    accept: 'Accept the terms',
    privacy: 'Privacy Policy',
    next: 'Next'
  },
  Forgot: {
    email: 'Email',
    incorrect: 'Your info is incorrect',
    send: 'Send'
  },
  ForgotPwdConfirm: {
    error: 'The password and confirmation do not match',
    pwd: 'Password',
    confirmPwd: 'Confirm Password',
    code: 'Code',
    confirm: 'Confirm'
  },
  Confirm: {
    alert: "Resent confirm code. Check your email again",
    error: 'veritication code is invalid',
    resend: 'Resend confirm code',
    confirm: 'Confirm'
  },
  SignUp: {
    email: 'Email',
    password: "Password",
    confirm: 'Confirm Password',
    signup: 'Sign Up'
  },
  Successful: {
    sucessful: 'Successful!',
    go: 'Go to Sign in'
  },
  SignIn: {
    info: 'You have a network problem\nPlease check your network connection',
    signIn: 'Sign in',
    signUp: 'Sign up',
    forgot: 'Forgot password?',
    apple: 'Sign in with Apple',
    google: 'Sign in with Google',
    github: 'Sign in with Github'
  },
  TUTORIAL: {
    tutorial1: {
      title: 'Find a new coworker!',
      content: 'Make the world a better place\nwith your new coworkers!'
    },
    tutorial2: {
      title: 'Talk and\nFind out a new way!',
      content: 'Share your brilliant idea with your fantastic coworkers'
    },
    tutorial3: {
      title: 'With Assemble, take care of your project!',
      content: 'Share an issue or a plan with your coworker!'
    },
  },
  APP: {
    alert: {
      title: 'Network problem',
      content: 'You have a network problem\nPlease check your network connection',
      okay: 'Okay'
    },
    assemble: (reciver, sender) => {
      return `👋🏼 Hi! ${reciver} I'm ${sender}!\n Let's make a better world together!`
    }
  },
  Projects: {
    task: 'Task',
    project: 'Project',
    issue: 'Issue',
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    today: 'Today',
    week: 'Week',
    month: 'Month',
    empty: 'Empty'
  },
  ChattingList: {
    unknown: 'Unknown',
    emptyMSG: 'Send a new message!',
    empty: `We can't find any message\nStart chat with coworker!`,
    longPress: {
      notification: 'Are you sure\nyou want to remove all of the chats?',
      item: ['Remove', (isTurnedOn) => {
        return 'Turn ' + (isTurnedOn ? 'on' : 'off') + ' notification'
      }]
    }
  },
  Chatting: {
    unknown: 'Unknown',
    info: 'We have a network problem,\n please try again in a few minutes',
    more: ['Remove', 'Resend'],
    longPress: ['Copy Text', 'Cancel']
  },
  Coworker: {
    info: 'We have a network problem,\n please try again in a few minutes',
    assembleMore: ['Reject', 'Accept'],
    more: ['Unblock', 'Block'],
    empty: 'Empty list...',
    assemblage: 'Assemblage list',
    coworker: 'Coworker list',
    block: 'Block list'
  },
  Notification: {
    empty: 'There is no notification',
    notify: {
      assemble: ' asks you to assemble with us',
      invite: ' wants to chagen the world with your awesome coworkers!',
      request: ' wants to assemble awesome coworkers into a project!'
    }
  },
  Setting: {
    allowEmail: 'Allow Email',
    allowChat: 'Allow Chat',
    disturb: 'Do not disturb',
    out: 'Are you sure\nyou want to log out?\nYour chat data will be removed',
    logout: 'Sign out',
    sendEmail: 'Ask something',
    language: 'Language',
    cancel: 'Cancel'
  },
  Comment: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    infos: {
      update: 'update this comment',
      get: 'get comment',
      del: 'delete this comment'
    },
    del: 'Are you sure to delete this comment?',
    new: 'Type a new comment ...',
    select: ['Edit', 'Add']
  },
  Community: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    infos: {
      liked: 'like',
      unliked: 'unlike',
      get: 'get any project',
      del: 'delete this post',
      noProject: 'You have to join or make a project first'
    },
    confirm: 'Are you sure to delete this post?',
    more: ['Edit', 'Delete'],
    more2: ['Block', 'Report'],
    search: 'Search a post',
    success: 'Success to delete this post',
    noProject: `Sorry, We can't find any post`,
    result: 'Result '
  },
  Like: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    fail: 'get list',
    title: 'Liked by'
  },
  Posting: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    quit: 'Are you sure \nYou want to quit writing?',
    infos: {
      upload: 'upload',
      sucess: 'Success to upload post',
      tag: 'get tags'
    },
    noContent: 'There is no content',
    noTag: 'There is no tag\nPlease add any tag for your post',
    openGallery: `We can't open gallery`,
    postPlace: "Do you have any good news?",
    urlError: 'Undefined url\nplease check url again\ne.g. https://www.assemble.ml',
    click: 'Click to see more details'
  },
  Search: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    infos: {
      search: 'search any post'
    },
    search: "Search a post",
    history: 'History',
    empty: 'There is no history...'
  },
  Tag: {
    info: (text) => { return `Sorry, We can't ${text}\nTry again please in a few minutes` },
    infos: {
      max: 'Maximum tag number is 5'
    },
    addTag: "Add a tag...",
    add: 'Add',
    close: 'Close'
  },
  UrlPreview: {
    egURL: 'e.g. https://www.assemble.ml',
    wrong: 'Wrong url pattern\nPlease check url again\ne.g https://www.assemble.ml',
    cancel: 'Cancel',
    add: 'Add',
  },
  ConfirmModal: {
    okay: 'Okay',
    cancel: 'Cancel'
  },
  Profile: {
    info: 'Sorry, We have a network problem',
    addCoworker: (name) => { return `Do you want to be coworker with ${name}?` },
    addcoworker: 'Coworker',
    website: 'Website',
    chat: 'Chat',
    github: 'Github',
    email: 'Email',
    setting: 'Setting',
    coworker: 'Coworker',
    notification: 'Notification',
    edit: 'Edit',
    report: 'Report',
    empty: 'Empty UserInfo',
  },
  ProjectTask: {
    info: (text) => { return `Sorry, We can't ${text} a task\nTry again please in a few minutes` },
    infos: {
      add: 'add',
      remove: 'remove',
      get: 'get',
    },
    vaild: (text) => { return `${text}is required` },
    vaildTxt: {
      title: 'Title',
      content: 'Content',
      start: 'Start date',
      end: 'End date',
      worker: 'Worker'
    },
    cancel: 'Cancel',
    edit: 'Edit',
    add: 'Add',
    title: 'TITLE',
    content: 'CONTENT',
    from: 'From',
    to: 'To',
    worker: 'Worker',
    all: 'All',
    close: 'Close',
    more: 'more',
    unDoneItem: ['Remove', 'Edit', 'Done'],
    unDoneComment: 'Are you sure \nYou want to remove this task?',
    doneItem: ['Remove', 'Undone'],
    doneComment: 'Are you sure \nYou want to remove this task?',
    empty: 'Empty task',
    uploadTask: `Someone uploaded a task`
  },
  ProjectRequest: {
    info: 'We have a network problem\nPlease try again in a few seconds',
    empty: 'Empty list',
    item: ['Reject', 'Accept'],
    uploadRequest: (user) => { return user + ` is our new crew!\nLet's say hello!` }
  },
  ProjectNote: {
    info: 'We have a network problem\nPlease try again in a few seconds',
    infos: {
      title: 'Title is required',
      content: 'Content is required'
    },
    title: 'TITLE',
    content: 'CONTENT',
    edit: 'EDIT',
    add: 'ADD',
    reset: 'RESET',
    item: ['Remove', 'Edit'],
    comment: 'Are you sure \nYou want to remove this memo?',
    close: 'Close',
    more: 'more',
    empty: 'Empty list',
    writed: 'WRITED AT'
  },
  ProjectIssue: {
    info: (text) => { return `Sorry, We can't ${text} this memo\nPlease try in a few minutes` },
    infos: {
      add: 'add',
      remove: 'remove',
      get: 'get',
      edit: 'edit',
    },
    require: {
      title: 'Title is required',
      content: 'Content is required'
    },
    title: 'TITLE',
    content: 'CONTENT',
    type: 'TYPE',
    types: {
      info: 'INFO',
      warning: 'WARNING',
      error: 'ERROR'
    },
    edit: 'EDIT',
    add: 'ADD',
    reset: 'RESET',
    all: 'ALL',
    done: 'DONE',
    item: ['Remove', 'Edit', 'Done'],
    comment: 'Are you sure \nYou want to remove this issue?',
    close: 'Close',
    more: 'more',
    empty: 'Empty Issue',
    writed: 'WRITED AT',
    uploadIssue: `Someone uploaded an issue`
  },
  ProjectDaily: {
    info: 'We have a network problem\nPlease try again in a few minutes',
    empty: 'Empty task'
  },
  NewProject: {
    info: 'We have a network problem\nPlease try again in a few minutes',
    allow: 'You have to allow us to access gallary',
    required: {
      name: 'Project name is required',
      tag: 'Tag is required',
      tech: 'Tech is required',
      web: 'Invaild web URL\nPlease check web URL\ne.g https://www.github.com',
      figma: 'Invaild figma URL\nPlease check figma URL\ne.g https://www.figma.com',
      github: 'Invaild github URL\nPlease check github URL\ne.g https://www.assemble.ml'
    },
    name: 'Project Name (Max 15)',
    member: 'Choose Member...',
    banish: 'Are you sure\nYou want to banish this member?',
    skill: 'Choose your skills...',
    tag: 'Tag',
    add: 'Add',
    tech: 'Tech',
    addTech: 'Add tech',
    addTag: 'Add Tag',
    done: 'Done'
  },
  Project: {
    info: 'We have a network problem\nPlease try again in a few minutes',
    tool: 'Tool',
    note: 'Note',
    issue: 'Issue',
    task: 'Task',
    daily: 'Daily',
    chat: 'Chat',
    edit: 'Edit',
    handover: 'Handover',
    leave: 'Leave',
    handoverLeader: 'Are you sure \nYou want to handover leader?',
    removeProject: 'Are you sure\nYou want to remove this project?\n(Every info(post, chat..) will be removed)',
    leaveProject: 'Are you sure\nYou want to quit this project?\n(Every info will be removed)',
    disband: 'Disband',
    today: 'Today',
    week: 'Week',
    month: 'Month',
    me: 'Me',
    team: 'Team',
  },
  InputModal: {
    info: 'We have a network problem\nPlease try again in a few minutes',
    success: 'Success',
    placeholder: {
      Request: 'Role',
      Block: 'Reason',
      Report: 'Reason'
    },
    send: 'Send',
    cancel: 'Cancel'
  },
  UserInfo: {
    save: `We can't save, Try again please`,
    pass: 'Pass',
    require: {
      country: "Country is empty",
      name: "Name is empty",
      dev: "Dev position is empty",
      skill: "Skill is empty",
      interest: "Interest is empty",
      company: 'Company is empty',
      work: 'What did you do on the company?',
      start: 'When was your first day?'
    },
    max: "The maximum is 5",
    allow: 'You have to allow us to access gallary',
    careerStartError: "Start date is supposed to be faster than last day",
    close: 'close',
    placeholder: {
      name: "*NAME (Max 20)",
      country: 'COUNTRY',
      job: "JOB (Max 30)",
      web: "WEB PAGE (Max 500)",
      dev: 'DEV',
      skill: "Choose your skill...",
      interest: "Choose your interest...",
      careerCompany: "Company (Max 50)",
      careerWork: "What did you do? (Max 200)",
    },
    next: 'Next',
    done: 'Done'
  },
  Privacy: `
Privacy Policy
Last updated: May 13, 2022

This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.

We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.

Interpretation and Definitions
Interpretation
The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

Definitions
For the purposes of this Privacy Policy:

Account means a unique account created for You to access our Service or parts of our Service.

Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

Application means the software program provided by the Company downloaded by You on any electronic device, named Assemble

Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Assemble.

Country refers to: South Korea

Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

Personal Data is any information that relates to an identified or identifiable individual.

Service refers to the Application.

Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.

Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).

You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

Collecting and Using Your Personal Data
Types of Data Collected
Personal Data
While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

Email address

Usage Data

Usage Data
Usage Data is collected automatically when using the Service.

Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.

We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.

Information Collected while Using the Application
While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:

Pictures and other information from your Device's camera and photo library
We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company's servers and/or a Service Provider's server or it may be simply stored on Your device.

You can enable or disable access to this information at any time, through Your Device settings.

Use of Your Personal Data
The Company may use Personal Data for the following purposes:

To provide and maintain our Service, including to monitor the usage of our Service.

To manage Your Account: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.

For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.

To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.

To provide You with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.

To manage Your requests: To attend and manage Your requests to Us.

For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.

For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.

We may share Your personal information in the following situations:

With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.
With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
With Your consent: We may disclose Your personal information for any other purpose with Your consent.
Retention of Your Personal Data
The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.

The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.

Transfer of Your Personal Data
Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.

Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.

The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.

Disclosure of Your Personal Data
Business Transactions
If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.

Law enforcement
Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).

Other legal requirements
The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:

Comply with a legal obligation
Protect and defend the rights or property of the Company
Prevent or investigate possible wrongdoing in connection with the Service
Protect the personal safety of Users of the Service or the public
Protect against legal liability
Security of Your Personal Data
The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.

Children's Privacy
Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.

If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.

Links to Other Websites
Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.

We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.

Changes to this Privacy Policy
We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.

We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

Contact Us
If you have any questions about this Privacy Policy, You can contact us:

By email: dudtjd4149@gmail.com`
}