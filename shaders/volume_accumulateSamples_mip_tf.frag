#version 110

uniform sampler3D volumeTexture;

uniform sampler1D tfTexture;
uniform float tfScale;
uniform float tfOffset;

vec4 accumulateSamples(vec3 ts, vec3 te, vec3 dt, float scale, float cutoff, int num_iterations)
{
    vec3 texcoord = te.xyz;
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 0.0);

    float max_a = 0.0;
    while(num_iterations>0)
    {
        float a = texture3D( volumeTexture, texcoord).a;

        if (a>max_a)
        {
            float v = a * tfScale + tfOffset;
            fragColor = texture1D( tfTexture, v);
            max_a = a;
        }

        texcoord += dt;

        --num_iterations;
    }

    return fragColor;
}