async function sigma(limit=10)
{
     sum=0;
     for(i=1; i<limit; i++)
     sum+=i;
     return sum;
}

console.log(sigma(100));

