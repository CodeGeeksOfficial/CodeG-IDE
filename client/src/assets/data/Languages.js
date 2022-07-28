const lang = [
  {
    ext: "cpp",
    editor_lang: "cpp",
    display_name:"C++",
    BoilerPlate: `#include<bits/stdc++.h>
using namespace std;

int main()
{
    cout<<"Hey Codie!"<<endl;
    return 0;
}`,
  },
  {
    ext: "py",
    editor_lang: "python",
    display_name:"Python",
    BoilerPlate: `print("Hey Codie!")`,
  },
  {
    ext: "java",
    editor_lang: "java",
    display_name:"Java",
    BoilerPlate: `public class Main {
    public static void main(String args[]) {
        System.out.println("Hey Codie!");
    }
}`,
  },
  {
    ext: "js",
    editor_lang: "javascript",
    display_name:"Node.js",
    BoilerPlate: `/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
console.log('Hey Codie!');`,
  },
];

export default lang;
