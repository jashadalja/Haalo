coinOf5=0
coinOf2=0
coinOf1=0
n=23001


coinOf5=n//5
remain=n-coinOf5*5

coinOf2=remain//2
remain=remain-coinOf2*2

coinOf1=remain

print(coinOf5)
print(coinOf2)
print(coinOf1)