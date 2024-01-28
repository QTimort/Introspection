# How to make an HTML Bundle
At this time NextJS does not offer a clean and easy solution to bundle an application into a single HTML file.
Hence why it has to be done manually.

Steps
1. Run `yarn build`
2. Run `yarn start`
3. Go to the application page
4. Open dev tool
5. Copy the HTML page
6. Replace each remote CSS/JS files in the HTML by adding style/script tag. The compiled files are located at `.next/static`
7. Look for any string "script" tag such as "<script>" or "</script>" and convert them to "<scr"+"ipt>" or "</scr"+"ipt>". Otherwise, it messes up the HTML parser.
8. Replace the block json fetch by the json data of the block, search for "fetch(" since there is only one, it's easy to find.
9. Lookup for the intensity value 1.75 and replace by 1.35
9. Done, the HTML should be now bundled and standalone!
