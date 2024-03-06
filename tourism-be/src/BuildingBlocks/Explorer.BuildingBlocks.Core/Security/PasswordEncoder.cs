using Konscious.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.BuildingBlocks.Core.Security;

public static class PasswordEncoder 
{
    private static readonly int HashSize = 64;
    private static readonly int SaltSize = 16;
    private static readonly byte[] Pepper = Encoding.UTF8.GetBytes("Biberce");

    public static string Encode(string password)
    {          
        var salt = GenerateSalt(SaltSize);

        var hash = GetHashBytes(password, salt);
        var combined = CombineHashAndSalt(hash, salt);

        return Convert.ToBase64String(combined);
    }

    public static bool Matches(string raw,string hashed)
    {
        var (hash, salt) = SeparateHashAndSalt( Convert.FromBase64String(hashed) );

        var rawHashed = GetHashBytes(raw, salt);

        return hash.SequenceEqual(rawHashed);
    }

    private static byte[] GetHashBytes(string password, byte[] salt)
    {
        var argon2 = new Argon2i(Encoding.UTF8.GetBytes(password));

        argon2.DegreeOfParallelism = 2;
        argon2.MemorySize = 8192;
        argon2.Iterations = 20;
        argon2.Salt = salt;
        argon2.KnownSecret = Pepper;

        var hash = argon2.GetBytes(HashSize);

        return hash;
    }

    private static byte[] GenerateSalt(int byteSize)
    {
        return RandomNumberGenerator.GetBytes(byteSize);
    }

    private static byte[] CombineHashAndSalt(byte[] hash, byte[] salt)
    {
        byte[] combined = new byte[HashSize + SaltSize];

        Buffer.BlockCopy(hash, 0, combined, 0, HashSize);
        Buffer.BlockCopy(salt, 0, combined, HashSize, SaltSize);

        return combined;
    }

    private static (byte[] hash,byte[] salt) SeparateHashAndSalt(byte[] combined)
    {
        byte[] hash = new byte[HashSize]; 
        byte[] salt = new byte[SaltSize];

        Buffer.BlockCopy(combined, 0, hash, 0, HashSize);
        Buffer.BlockCopy(combined, HashSize, salt, 0, SaltSize);

        return (hash, salt);
    }


}
